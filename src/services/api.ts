import type { Post } from '../types/post';

const BASE_URL = 'https://jsonplaceholder.org';

export async function fetchPosts(): Promise<Post[]> {
  const response = await fetch(`${BASE_URL}/posts`);

  if (!response.ok) {
    throw new Error(
      `Failed to load posts. Server responded with ${response.status}.`
    );
  }

  const data = (await response.json()) as Post[];
  return data;
}
