import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

export default function NavBar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="container flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 rounded-lg bg-brand text-white items-center justify-center font-bold">
            S
          </span>
          <span className="font-bold tracking-tight text-ink">
            SIGNAL.BRIDGE
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-brand">
            Feed
          </Link>
          {user && ["admin", "trainer"].includes(user.role) && (
            <>
              <Link to="/create" className="hover:text-brand">
                Create Content
              </Link>
              <Link to="/admin" className="hover:text-brand">
                Admin
              </Link>
            </>
          )}
          {user ? (
            <button onClick={logout} className="btn">
              Logout ({user.role})
            </button>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
              <Link to="/register" className="btn">
                Register
              </Link>
            </>
          )}
        </nav>

        {/* mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden inline-flex items-center p-2 rounded-lg border"
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="container py-3 flex flex-col gap-3">
            <Link to="/" onClick={() => setOpen(false)}>
              Feed
            </Link>
            {user && ["admin", "trainer"].includes(user.role) && (
              <>
                <Link to="/create" onClick={() => setOpen(false)}>
                  Create Content
                </Link>
                <Link to="/admin" onClick={() => setOpen(false)}>
                  Admin
                </Link>
              </>
            )}
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="btn"
              >
                Logout ({user.role})
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="btn btn-primary"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="btn"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
