import { NavLink, Outlet } from "react-router-dom";
import { FiFileText, FiList, FiBarChart2 } from "react-icons/fi";

export default function AdminLayout() {
  return (
    <div className="w-full h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#131a24] text-white flex flex-col p-4">
        <div className="text-xl font-bold mb-6">Admin Panel</div>
        <nav className="flex flex-col gap-3">
          <NavLink
            to="/admin/documents"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md hover:bg-slate-600 ${
                isActive ? "bg-slate-700 font-semibold" : ""
              }`
            }
          >
            <FiFileText /> Quản lý tài liệu
          </NavLink>

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
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        {/* Outlet để load các page con */}
        <Outlet />
      </main>
    </div>
  );
}
