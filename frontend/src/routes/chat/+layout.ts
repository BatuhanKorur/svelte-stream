import type { LoadEvent } from '@sveltejs/kit';
export const load = async ({ fetch }: { fetch: LoadEvent["fetch"] }) => {
  const res = await fetch('http://localhost:3000/ollama/models');
  const item = await res.json();
  return { ...item }
}