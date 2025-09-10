// src/components/AdminNavbar.jsx
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/authSlice";
import { useNavigate, Link } from "react-router-dom";

export default function AdminNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // chuyển về trang user
  };

  return (
    <header className="w-full h-14 bg-[#1f2937] text-white flex items-center justify-between px-6 shadow">
      {/* Link về Dashboard */}
      <Link
        to="/admin"
        className="font-semibold text-lg hover:text-gray-300 transition"
      >
        Admin Panel
      </Link>

      <div className="flex items-center gap-4">
        <span>{user?.ten || user?.email}</span>
        <button
          onClick={handleLogout}
          className="px-3 py-1 bg-red-600 rounded hover:bg-red-700 transition"
        >
          Đăng xuất
        </button>
      </div>
    </header>
  );
}
