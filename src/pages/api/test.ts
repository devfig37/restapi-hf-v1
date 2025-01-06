export const prerender = false;
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
    const secret = process.env.API_SECRET;
    const userAgent = request.headers.get('User-Agent') || '';

    if (/Mozilla|Chrome|Safari|Firefox|Edge/.test(userAgent) && !/curl/.test(userAgent)) {
      return new Response(
        JSON.stringify({ error: "This endpoint is not accessible from browsers." }),
        {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  
    if (!secret) {
      return new Response("Server misconfiguration: API secret is missing", {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const authorizationHeader = request.headers.get("Authorization");
  
    if (!authorizationHeader) {
      return new Response("Missing Authorization header", { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }, 
    });
    }

    const isValid = authorizationHeader === `Bearer ${secret}`;
  
    if (!isValid) {
      return new Response("Unauthorized", { 
        status: 403,
        headers: { 'Content-Type': 'application/json' },
    });
    }
  
    return new Response("Authorized", { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }, 
    });
};