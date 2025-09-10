import { NavLink, Outlet } from "react-router-dom";
import { FiFileText, FiList, FiBarChart2, FiChevronDown } from "react-icons/fi";
import { useState } from "react";
import AdminNavbar from "./AdminNavbar";
export default function AdminLayout() {
  const [openUserMenu, setOpenUserMenu] = useState(false);

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100">
      <AdminNavbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-[#131a24] text-white flex flex-col p-4">
          <div className="text-xl font-bold mb-6">Quản trị</div>
          <nav className="flex flex-col gap-3">
            {/* Dropdown: Quản lý người dùng */}
            <details className="group">
  <summary className="flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-slate-600">
    <span className="flex items-center gap-2">
      <FiFileText /> Quản lý người dùng
    </span>
  </summary>
  <div className="ml-6 mt-2 flex flex-col gap-2">
    <NavLink
      to="/admin/users/admins"
      className={({ isActive }) =>
        `p-2 rounded-md hover:bg-slate-600 ${
          isActive ? "bg-slate-700 font-semibold" : ""
        }`
      }
    >
      Tài khoản Admin
    </NavLink>
    <NavLink
      to="/admin/users/normal"
      className={({ isActive }) =>
        `p-2 rounded-md hover:bg-slate-600 ${
          isActive ? "bg-slate-700 font-semibold" : ""
        }`
      }
    >
      Tài khoản Người dùng
    </NavLink>
  </div>
</details>

            {/* Các mục khác */}
            <NavLink
              to="/admin/podcasts"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded-md hover:bg-slate-600 ${
                  isActive ? "bg-slate-700 font-semibold" : ""
                }`
              }
            >
              <FiList /> Quản lý Podcast
            </NavLink>

            <NavLink
              to="/admin/analytics"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded-md hover:bg-slate-600 ${
                  isActive ? "bg-slate-700 font-semibold" : ""
                }`
              }
            >
              <FiBarChart2 /> Analytics
            </NavLink>
          </nav>
        </aside>

        {/* Nội dung chính */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
