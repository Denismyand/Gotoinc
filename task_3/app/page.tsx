import Link from "next/link";
import ListPost from "./components/ListPost";
import { Post } from "./types";
import { cookies } from "next/headers";

const Home = async () => {
  const res = await fetch(`${process.env.API_ENDPOINT}/posts`);
  const posts: Post[] = await res.json();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const isLoggedIn = !!token;

  return (
    <div className="relative flex flex-col gap-8">
      <h1 className="text-3xl font-bold text-center">Posts</h1>
      <Link href={isLoggedIn ? "/dashboard" : "/login"}>
        <button className="absolute right-0 top-0 px-4 py-2 bg-background border border-foreground rounded-lg transition-shadow duration-300 hover:shadow-md">
          {isLoggedIn ? "Dashboard" : "Login"}
        </button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <ListPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
