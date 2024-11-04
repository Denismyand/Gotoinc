import { FC } from "react";
import { Post } from "../types";
import Link from "next/link";

type IListPostProps = { post: Post };

const ListPost: FC<IListPostProps> = ({ post }) => {
  return (
    <Link href={`/posts/${post.id}`}>
      <div className="flex flex-col gap-4 border border-foreground p-4 rounded-lg transition-shadow duration-300 hover:shadow-md">
        <h3 className="text-xl font-bold line-clamp-1">{post.title}</h3>
        <p className="line-clamp-2">{post.body}</p>
      </div>
    </Link>
  );
};

export default ListPost;
