import { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();
  const [f, setF] = useState({ name: "", email: "", password: "" });

  const submit = async () => {
    await api("/api/auth/register", { method: "POST", body: f });
    alert("Registered! Now login.");
    nav("/login");
  };

  return (
    <div className="card max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-2">Register</h2>
      <input
        className="border p-3 rounded-xl w-full mb-2"
        placeholder="Name"
        value={f.name}
        onChange={(e) => setF({ ...f, name: e.target.value })}
      />
      <input
        className="border p-3 rounded-xl w-full mb-2"
        placeholder="Email"
        value={f.email}
        onChange={(e) => setF({ ...f, email: e.target.value })}
      />
      <input
        className="border p-3 rounded-xl w-full mb-4"
        placeholder="Password"
        type="password"
        value={f.password}
        onChange={(e) => setF({ ...f, password: e.target.value })}
      />
      <button onClick={submit} className="btn btn-primary w-full">
        Register
      </button>
      <p className="text-xs text-slate-500 mt-2">
        The first user to register will automatically become the <b>admin.</b>{" "}
      </p>
    </div>
  );
}
