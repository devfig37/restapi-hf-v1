export const prerender = false;
import type { APIRoute } from 'astro';

const jsonResponse = (message: string, status: number) =>
  new Response(JSON.stringify({ message }), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', 
      'Access-Control-Allow-Methods': 'POST, OPTIONS', 
    },
  });

export const POST: APIRoute = async ({ request }) => {
  const secret = process.env.API_SECRET;
  const userAgent = request.headers.get('User-Agent') || '';

  const isBrowserRequest = /Mozilla|Chrome|Safari|Firefox|Edge/.test(userAgent) && !/curl/.test(userAgent);
  if (isBrowserRequest) {
    return jsonResponse("This endpoint is not accessible from browsers.", 403);
  }

  if (!secret) {
    return jsonResponse("Server misconfiguration: API secret is missing.", 500);
  }

  const authorizationHeader = request.headers.get("Authorization");
  if (!authorizationHeader) {
    return jsonResponse("Missing Authorization header.", 401);
  }

  const isValid = authorizationHeader === `Bearer ${secret}`;
  if (!isValid) {
    return jsonResponse("Unauthorized.", 403);
  }

  return jsonResponse("Authorized.", 200);
};

export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
};