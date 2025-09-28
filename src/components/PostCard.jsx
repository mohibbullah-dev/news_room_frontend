import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <article className="group card overflow-hidden p-0">
      <div className="relative">
        <img
          src={post.featuredImage || "https://picsum.photos/800/500?blur=1"}
          className="w-full h-56 object-cover transition group-hover:scale-[1.02]"
        />
        <span className="pill absolute left-3 top-3">NEWS</span>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-ink">
          <Link to={`/post/${post.slug}`} className="hover:text-brand">
            {post.title}
          </Link>
        </h3>
        <p className="meta mt-1">
          By {post.author?.name || "Unknown"} ·{" "}
          {new Date(post.createdAt).toLocaleString()}
        </p>
      </div>
    </article>
  );
}
