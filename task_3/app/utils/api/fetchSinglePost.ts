export const fetchSinglePost = async (id: string) => {
  const response = await fetch(`${process.env.API_ENDPOINT}/posts/${id}`);

  if (!response.ok) return null;

  const post = await response.json();
  return post;
};
