import type { APIRoute } from 'astro';

const usernames = ["Sarah", "Chris", "Yan", "Elian"];

export const GET: APIRoute = ({ params, request }) => {
  const id: any = params.id;
  return new Response(
    JSON.stringify({
      id: id,
      name: usernames[id],
    })
  )
};

export function getStaticPaths() {
  return [
    { params: { id: "0"} },
    { params: { id: "1"} },
    { params: { id: "2"} },
    { params: { id: "3"} }
  ]
};