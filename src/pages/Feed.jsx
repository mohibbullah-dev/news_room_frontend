import { useEffect, useState } from "react";
import { api } from "../api";
import PostCard from "../components/PostCard";

export default function Feed() {
  const [data, setData] = useState({ items: [], total: 0 });
  useEffect(() => {
    api("/api/posts?status=published").then(setData);
  }, []);

  return (
    <div className="space-y-6">
      {/* Breaking banner */}
      <div className="rounded-2xl bg-red-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <div className="font-semibold">BREAKING NEWS</div>
            <div className="text-sm opacity-90">
              Check out today's latest updates here.
            </div>
          </div>
        </div>
        <div className="hidden sm:block text-sm opacity-90">
          Newsroom • {new Date().toLocaleDateString()}
        </div>
      </div>
  
      {/* Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {data.items.map((p) => (
          <PostCard key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
