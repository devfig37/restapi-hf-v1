export const prerender = false;
import { API_SECRET } from "astro:env/server";
// const setAPIkey = import.meta.env.API_KEY;

import type { APIRoute } from 'astro';

interface Car {
  name?: string;
  models?: string[];
}

interface RequestBody {
  person?: string;
  jobs?: string[];
  cars?: Car[];
}

const usernames = ["Sarah", "Chris", "Yan", "Elian", "LeBron", "Michael"];

export const GET: APIRoute = ({ params, request }) => {

  const apiKey = request.headers.get('Authorization');

  if (!apiKey || !API_SECRET.includes(apiKey)) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }), 
      { 
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

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

  const id: any = params.id;

  if (!usernames[id]) {
    return new Response(
      JSON.stringify({ error: "User not found" }),
      { 
        status: 404, 
        headers: { 
          'Content-Type': 'application/json',
        },
      }
    );
  }

  return new Response(
    JSON.stringify({
      id: id,
      name: usernames[id],
    }),
    { 
      headers: { 
        'Content-Type': 'application/json',
      } 
    }
  );
};

export const POST: APIRoute = async ({ params, request }) => {

  const apiKey = request.headers.get('Authorization');

  if (!apiKey || !API_SECRET.includes(apiKey)) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }), 
      { 
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const userAgent = request.headers.get('User-Agent') || '';

  if (/Mozilla|Chrome|Safari|Firefox|Edge/.test(userAgent) && !/curl/.test(userAgent)) {
    return new Response(
      JSON.stringify({ error: "This endpoint is not accessible from browsers." }),
      {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  };
  
  try {
    const body = await request.json();

    if (!body || Object.keys(body).length === 0) {
      return new Response(
        JSON.stringify({ error: "Request body is empty or missing." }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    };

    const person = body.person;
    const job = Array.isArray(body.jobs) && body.jobs.length > 0 ? body.jobs[0] : undefined;
    const cars = Array.isArray(body.cars) 
      ? body.cars.map((car: Car) => ({
          name: car.name || null,
          firstModel: Array.isArray(car.models) && car.models.length > 0 ? car.models[0] : null,
        }))
      : [];

      return new Response(
        JSON.stringify({
          person: person,
          job: job,
          cars: cars,
        }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } 
  catch(error) {
    return new Response(
      JSON.stringify({ error: "Invalid or malformed JSON in request body." }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  };

};

export function getStaticPaths() {
  return [
    { params: { id: "0" } },
    { params: { id: "1" } },
    { params: { id: "2" } },
    { params: { id: "3" } },
    { params: { id: "4" } },
    { params: { id: "5" } },
  ];
};