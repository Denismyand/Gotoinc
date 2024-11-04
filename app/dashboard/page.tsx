"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

const Dashboard = () => {
  const router = useRouter();
  const handleLogout = async () => {
    const res = await fetch("/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/login");
    } else {
      console.error("Unable to log out");
    }
  };
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-full">
      <h1 className="text-2xl font-bold">
        Welcome to the blog posts dashboard
      </h1>
      <div className="flex gap-4">
        <Link href="/">
          <button className="px-4 py-2 bg-background border border-foreground rounded-lg transition-shadow duration-300 hover:shadow-md">
            Browse posts
          </button>
        </Link>
        <button
          className="px-4 py-2 bg-background border border-foreground rounded-lg transition-shadow duration-300 hover:shadow-md"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
