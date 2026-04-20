import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../features/auth/authStore";
import { APP_NAME } from "../../utils/constants";
import {
  LayoutDashboard,
  ListTodo,
  PlusCircle,
  LogOut,
} from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, clearAuth } = useAuthStore();

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinkClass = (path: string) =>
    `inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${
      isActive(path)
        ? "bg-slate-900 text-white shadow-sm"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">

        {/* LEFT - LOGO */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 text-sm font-bold text-white shadow">
            NN
          </div>
          <div>
            <h1 className="text-base font-semibold text-slate-900">
              {APP_NAME}
            </h1>
            <p className="text-xs text-slate-500">
              Issue Tracking System
            </p>
          </div>
        </div>

        {/* CENTER - NAV */}
        <nav className="flex flex-wrap items-center gap-2">
          <Link to="/" className={navLinkClass("/")}>
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>

          <Link to="/issues" className={navLinkClass("/issues")}>
            <ListTodo className="h-4 w-4" />
            Issues
          </Link>

          <Link to="/issues/create" className={navLinkClass("/issues/create")}>
            <PlusCircle className="h-4 w-4" />
            New Issue
          </Link>
        </nav>

        {/* RIGHT - USER + LOGOUT */}
        <div className="flex items-center gap-4">
          {/* USER INFO */}
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-slate-800">
              {user?.name}
            </p>
            <p className="text-xs text-slate-500">{user?.email}</p>
          </div>

          {/* AVATAR */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>

          {/* LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-xl border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 hover:text-red-700"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;