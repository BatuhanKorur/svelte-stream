import type {LoadEvent} from '@sveltejs/kit';

export const load = async ({ fetch }: { fetch: LoadEvent["fetch"] }) => {
  const res = await fetch('http://localhost:3000/ollama/models');
  return await res.json();
}