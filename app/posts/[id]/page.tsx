import type { Post } from "@/app/types";
import { fetchSinglePost } from "@/app/utils/api/fetchSinglePost";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface IPostProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: IPostProps): Promise<Metadata> {
  const { id } = await params;
  const post = await fetchSinglePost(id);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.body,
  };
}

const Post = async ({ params }: IPostProps) => {
  const { id } = await params;
  const post: Post = await fetchSinglePost(id);

  if (!post) return notFound();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-center text-2xl font-bold">{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
};

export default Post;
