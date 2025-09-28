import { useEffect, useState } from "react";
import { api } from "../api";
import { useAuth } from "../contexts/AuthContext";

export default function CommentList({ postId }) {
  const { user, token } = useAuth();
  const [list, setList] = useState([]);
  const [body, setBody] = useState("");
  const [reply, setReply] = useState({ to: null, text: "" });

  const load = async () => {
    const data = await api(`/api/comments/${postId}`);
    setList(data);
  };
  useEffect(() => {
    load();
  }, [postId]);

  const add = async () => {
    await api(`/api/comments/${postId}`, {
      method: "POST",
      body: { body },
      token,
    });
    setBody("");
    load();
  };
  const sendReply = async () => {
    await api(`/api/comments/reply/${reply.to}`, {
      method: "POST",
      body: { body: reply.text },
      token,
    });
    setReply({ to: null, text: "" });
    load();
  };

  const canReply = user && ["admin", "trainer"].includes(user.role);

  return (
    <div className="mt-6">
      <h4 className="font-semibold mb-2">Comments</h4>

      <div className="space-y-4">
        {list
          .filter((c) => !c.parentId)
          .map((c) => (
            <div key={c._id} className="p-3 bg-slate-100 rounded-xl">
              <p className="text-sm">
                <b>{c.author?.name}</b>: {c.body}
              </p>
              <div className="text-xs text-slate-500">
                {new Date(c.createdAt).toLocaleString()}
              </div>
              {canReply && (
                <button
                  className="text-xs text-blue-600 mt-1"
                  onClick={() => setReply({ to: c._id, text: "" })}
                >
                  Reply
                </button>
              )}
              {/* replies */}
              <div className="pl-4 mt-2 space-y-2">
                {list
                  .filter((r) => String(r.parentId) === String(c._id))
                  .map((r) => (
                    <div key={r._id} className="p-2 rounded-lg bg-white">
                      <p className="text-sm">
                        <b>{r.author?.name}</b>: {r.body}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>

      {user && (
        <div className="mt-4">
          <textarea
            className="w-full p-3 rounded-xl border"
            rows="3"
            placeholder="Add a comment…"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <button onClick={add} className="btn btn-primary mt-2">
            Post Comment
          </button>
        </div>
      )}

      {canReply && reply.to && (
        <div className="mt-4 card">
          <h5 className="font-semibold mb-2">Reply</h5>
          <textarea
            className="w-full p-3 rounded-xl border"
            rows="2"
            value={reply.text}
            onChange={(e) => setReply({ ...reply, text: e.target.value })}
          />
          <div className="mt-2 flex gap-2">
            <button className="btn btn-primary" onClick={sendReply}>
              Send Reply
            </button>
            <button
              className="btn"
              onClick={() => setReply({ to: null, text: "" })}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
