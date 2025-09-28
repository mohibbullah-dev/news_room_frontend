import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";
import CommentList from "../components/CommentList";

export default function SinglePost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    api(`/api/posts/${slug}`).then(setPost);
  }, [slug]);
  if (!post) return <div>Loading…</div>;

  return (
    <article className="card p-0 overflow-hidden">
      {post.featuredImage && (
        <img
          src={post.featuredImage}
          className="w-full h-[360px] object-cover"
        />
      )}
      <div className="p-6">
        <span className="pill">NEWS</span>
        <h1 className="text-3xl md:text-4xl font-bold text-ink mt-2">
          {post.title}
        </h1>
        <div className="meta mt-1">
          By {post.author?.name} • {new Date(post.createdAt).toLocaleString()}
        </div>

        <div
          className="mt-5 leading-relaxed text-[17px] text-slate-800"
          dangerouslySetInnerHTML={{ __html: post.contentHTML }}
        />

        {post.media
          ?.filter((m) => m.type === "video")
          .map((m, i) => (
            <div key={i} className="mt-6">
              <iframe
                className="w-full aspect-video rounded-2xl"
                src={m.url.replace("watch?v=", "embed/")}
                allowFullScreen
              />
            </div>
          ))}

        <CommentList postId={post._id} />
      </div>
    </article>
  );
}
