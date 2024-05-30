export default async function getPosts({
    pageParam = 1,
  }: {
    pageParam: unknown;
  }) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=6`
  );
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return res.json();
}
