import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [f, setF] = useState({
    email: "admin@example.com",
    password: "password123",
  });
  const submit = async () => {
    await login(f.email, f.password);
    nav("/");
  };
  return (
    <div className="card max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-2">Login</h2>
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
        Login
      </button>
    </div>
  );
}
