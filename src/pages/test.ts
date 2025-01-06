export const prerender = false;
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const secret = process.env.API_SECRET || import.meta.env.API_KEY;

  if (!secret) {
    return new Response("API_SECRET is not set or undefined.", {
      status: 500,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  return new Response(`The value of API_SECRET is: ${secret}`, {
    status: 200,
    headers: { 'Content-Type': 'text/plain' },
  });
};