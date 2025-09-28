import { useState } from "react";
import { api } from "../api";
import { useAuth } from "../contexts/AuthContext";

export default function CreatePost() {
  const { token } = useAuth();
  const [f, setF] = useState({
    title: "",
    contentHTML: "",
    featuredImage: "",
    videoUrl: "",
  });
  const [file, setFile] = useState(null);

  const upload = async () => {
    if (!file) return null;
    const fd = new FormData();
    fd.append("file", file);
    const r = await api("/api/uploads", {
      method: "POST",
      isForm: true,
      body: fd,
      token,
    });
    return r.url;
  };

  const submit = async () => {
    let featuredImage = f.featuredImage;
    if (file) featuredImage = await upload();

    const media = f.videoUrl ? [{ type: "video", url: f.videoUrl }] : [];
    const body = {
      title: f.title,
      contentHTML: f.contentHTML,
      featuredImage,
      media,
      status: "published",
    };
    const p = await api("/api/posts", { method: "POST", body, token });
    window.location.href = `/post/${p.slug}`;
  };

  return (
    <div className="card space-y-3">
      <h2 className="text-2xl font-bold">Create Content</h2>

      <input
        className="border p-3 rounded-xl w-full"
        placeholder="Title"
        value={f.title}
        onChange={(e) => setF({ ...f, title: e.target.value })}
      />
      <textarea
        className="border p-3 rounded-xl w-full min-h-[160px]"
        placeholder="Write HTML or simple text…"
        value={f.contentHTML}
        onChange={(e) => setF({ ...f, contentHTML: e.target.value })}
      />

      <div className="grid sm:grid-cols-2 gap-3">
        <input
          className="border p-3 rounded-xl w-full"
          placeholder="Featured Image URL (optional)"
          value={f.featuredImage}
          onChange={(e) => setF({ ...f, featuredImage: e.target.value })}
        />
        <input
          type="file"
          className="border p-3 rounded-xl w-full"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </div>

      <input
        className="border p-3 rounded-xl w-full"
        placeholder="YouTube/Vimeo URL (optional)"
        value={f.videoUrl}
        onChange={(e) => setF({ ...f, videoUrl: e.target.value })}
      />

      <button onClick={submit} className="btn btn-primary">
        Publish
      </button>
    </div>
  );
}
