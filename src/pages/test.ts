export const prerender = false;
import type { APIRoute } from 'astro';
import { API_SECRET } from "astro:env/server";
// import { API_KEY } from "astro:env/client";

export const GET: APIRoute = ({ request }) => {

  const apiKey = request.headers.get('Authorization');
  var confirmServer = '';
  // var confirmClient = '';

  if (!apiKey) {
    return new Response("API_SECRET is not set or undefined.", {
      status: 500,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  if(apiKey === API_SECRET) {
    confirmServer = 'Server API key working!';
  };

  // if(apiKey === API_KEY) {
  //   confirmServer = 'Client API key working!';
  // };

  if (apiKey !== API_SECRET) {
    return new Response("Unauthorized", {
      status: 401,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  return new Response(`${confirmServer}`, {
    status: 200,
    headers: { 'Content-Type': 'text/plain' },
  });
};