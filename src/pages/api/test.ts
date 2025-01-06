export async function post({ request }: { request: Request }) {
    const secret = process.env.API_SECRET;
  
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