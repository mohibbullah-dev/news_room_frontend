import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import AuthProvider, { useAuth } from "./contexts/AuthContext";
import App from "./App";
import Feed from "./pages/Feed";
import SinglePost from "./pages/SinglePost";
import CreatePost from "./pages/CreatePost";
import AdminPanel from "./pages/AdminPanel";
import Login from "./pages/Login";
import Register from "./pages/Register";

function Protected({ children, roles }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route index element={<Feed />} />
            <Route path="/post/:slug" element={<SinglePost />} />
            <Route
              path="/create"
              element={
                <Protected roles={["admin", "trainer"]}>
                  <CreatePost />
                </Protected>
              }
            />
            <Route
              path="/admin"
              element={
                <Protected roles={["admin", "trainer"]}>
                  <AdminPanel />
                </Protected>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
