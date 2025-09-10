import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoginDialog from "./LoginDialog";
import { logout } from "@/redux/authSlice";
import '../styles/Nabar.css';
import { colors } from "@mui/material";
import { red } from "@mui/material/colors";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [dialog, setDialog] = useState(null);

  const toggleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigateDashboard = () => {
    if (user?.role === "admin") navigate("/admin");
    else navigate("/profile");
    setIsUserDropdownOpen(false);
  };

  // Mở dialog, nhưng blur nút trước để tránh cảnh báo aria-hidden
  const openLoginDialog = (e) => {
    e.currentTarget.blur(); // bỏ focus khỏi nút
    setDialog("login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/home" className="navbar-logo">
          <img src="/img/logo1.jpg" alt="Logo" className="logo-icon" />
          <div>
            <div className="text-red-600 text-2xl">SurVey</div>
          </div>
        </Link>

        {/* Links */}
        <div className="survey-link">
          <Link to="/create-survey" className="create-survey-link">Tạo khảo sát</Link>
          <Link to="/my-survey" className="my-survey-link">Khảo sát của tôi</Link>
        </div>

        {/* User / Login */}
        <li className="nav-item">
          {user ? (
            <div className="user-dropdown" ref={dropdownRef}>
              <div className="user-info" onClick={toggleUserDropdown}>
                <div className="user-avatar">
                  {user?.avatar ? (
                    <img src={user.avatar} alt="Avatar" className="avatar-img" />
                  ) : (
                    <div className="avatar-placeholder">{user.Ten?.charAt(0).toUpperCase() || 'U'}</div>
                  )}
                </div>
                <span className="user-name">{user.Ten} ({user.role})</span>
              </div>

              <div className={`dropdown-menu ${isUserDropdownOpen ? 'show' : ''}`}>
                <button className="dropdown-item" onClick={handleNavigateDashboard}>
                  {user.role === "admin" ? "Dashboard" : "Trang cá nhân"}
                </button>
                <button className="dropdown-item logout-btn" onClick={() => dispatch(logout())}>
                  Đăng xuất
                </button>
              </div>
            </div>
          ) : (
            <>
              <button className="login-btn" onClick={openLoginDialog}>
                🔐 Đăng nhập
              </button>
              <LoginDialog
                open={dialog === "login"}
                onOpenChange={(val) => setDialog(val ? "login" : null)}
              />
            </>
          )}
        </li>
      </div>
    </nav>
  );
}
