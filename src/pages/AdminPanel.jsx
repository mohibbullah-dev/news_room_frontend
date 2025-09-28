import { useEffect, useState } from "react";
import { api } from "../api";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const Kpi = ({ title, value, grad }) => (
  <div className={`rounded-2xl p-5 text-white ${grad}`}>
    <div className="text-sm/none opacity-90">{title}</div>
    <div className="text-3xl md:text-4xl font-bold mt-1">{value}</div>
  </div>
);

export default function AdminPanel() {
  const { token } = useAuth();
  const [s, setS] = useState(null);
  useEffect(() => {
    api("/api/admin/stats", { token }).then(setS);
  }, []);
  if (!s) return <div>Loading…</div>;

  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi
          title="Active Users (30d)"
          value={s.activeUsers}
          grad="bg-gradient-to-br from-blue-500 to-cyan-500"
        />
        <Kpi
          title="Pending Posts"
          value={s.pendingPosts}
          grad="bg-gradient-to-br from-amber-500 to-orange-500"
        />
        <Kpi
          title="Total Posts"
          value={s.totalPosts}
          grad="bg-gradient-to-br from-emerald-500 to-green-600"
        />
        <Kpi
          title="Operators (Trainers)"
          value={s.operators}
          grad="bg-gradient-to-br from-indigo-500 to-violet-500"
        />
      </div>

      <div className="card flex items-center justify-between">
        <div>
          <div className="font-semibold">Quick Actions</div>
          <div className="text-sm text-slate-500">
            Create & manage newsroom content
          </div>
        </div>
        <Link to="/create" className="btn btn-primary">
          + Create Content
        </Link>
      </div>
    </div>
  );
}
