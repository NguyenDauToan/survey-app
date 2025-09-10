import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RequireAdmin() {
  const user = useSelector((state) => state.auth.user);

  if (!user || !user.role) return <Navigate to="/" replace />;
  if (user.role !== "admin") return <Navigate to="/" replace />;

  return <Outlet />;
}
