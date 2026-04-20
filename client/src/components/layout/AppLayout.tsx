import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuthStore } from "../../features/auth/authStore";

const AppLayout = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;