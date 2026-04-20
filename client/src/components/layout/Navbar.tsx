import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../features/auth/authStore";
import { APP_NAME } from "../../utils/constants";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, clearAuth } = useAuthStore();

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  const navLinkClass = (path: string) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition ${
      location.pathname === path
        ? "bg-slate-900 text-white"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-sm font-bold text-white">
            NN
          </div>
          <div>
            <h1 className="text-base font-semibold text-slate-900">{APP_NAME}</h1>
            <p className="text-xs text-slate-500">Frontend assignment project</p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-2">
          <Link to="/" className={navLinkClass("/")}>
            Dashboard
          </Link>
          <Link to="/issues" className={navLinkClass("/issues")}>
            Issues
          </Link>
          <Link to="/issues/create" className={navLinkClass("/issues/create")}>
            New Issue
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-slate-800">{user?.name}</p>
            <p className="text-xs text-slate-500">{user?.email}</p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;