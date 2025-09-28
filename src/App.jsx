import { Outlet, Link, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";

export default function App() {
  const loc = useLocation();
  return (
    <>
      <NavBar />
      <main className="container my-6 md:my-10">
        <Outlet key={loc.key} />
      </main>
      <footer className="text-center text-xs py-6 text-slate-500">
        Newsroom © {new Date().getFullYear()}
      </footer>
    </>
  );
}
