export const prerender = false;
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ request }) => {

  const apiKey = request.headers.get('Authorization');

  if (!apiKey) {
    return new Response("API_SECRET is not set or undefined.", {
      status: 500,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  return new Response(`The value of API_SECRET is: ${apiKey}`, {
    status: 200,
    headers: { 'Content-Type': 'text/plain' },
  });
};