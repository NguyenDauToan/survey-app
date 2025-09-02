import { Button } from "@/components/ui/button"
import { Upload, Download, Share2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import LoginDialog from "./LoginDialog"
import { useDispatch } from "react-redux"
import { logout } from "@/redux/authSlice"
import RegisterDialog from "./RegisterDialog"
import Home from "./Home"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import '../styles/Nabar.css'

export default function Navbar({ submissions = [], onExport, onImport, shareFillLink }) {
  const copyLink = async () => {
    if (shareFillLink) await navigator.clipboard.writeText(shareFillLink)
  }
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false)
  const user = useSelector((state) => state.auth.user)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const toggleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen)
  const [openLogin, setOpenLogin] = useState(false);
  const [dialog, setDialog] = useState(null) 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/home" className="navbar-logo">
          <img
            src="data:image/png;base64,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"
            alt="Logo"
            className="logo-icon"
          />
          <div>
            <div className="logo-text">RTE Center</div>
            <div className="logo-subtitle">English Learning</div>
          </div>
        </Link>
        <li className="nav-item">
            {user ? (
              <div className="user-dropdown" ref={dropdownRef}>
                <div className="user-info" onClick={toggleUserDropdown}>
                  <div className="user-avatar">
                    {user?.avatar ? (
                      <img
                        src={user.avatar || '/placeholder.svg'}
                        alt="Avatar"
                        className="avatar-img"
                      />
                    ) : (
                      <div className="avatar-placeholder">
                        {user.displayname?.charAt(0).toUpperCase() || 'U'}
                      </div>
                    )}
                  </div>
                  <span className="user-name">{user.displayname}</span>
                  <svg
                    className={`dropdown-arrow ${isUserDropdownOpen ? 'open' : ''}`}
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M3 4.5L6 7.5L9 4.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div className={`dropdown-menu ${isUserDropdownOpen ? 'show' : ''}`}>
                  <div className="dropdown-">
                    <div className="user-details">
                      <div className="user-name-large">{user.displayname}</div>
                      <div className="user-email">{user.email || 'user@example.com'}</div>
                    </div>
                  </div>

                  <div className="dropdown-divider" />

                  <div className="dropdown-body">
                    <Link
                      to="/profile"
                      className="dropdown-item"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="12"
                          cy="7"
                          r="4"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Hồ sơ cá nhân
                    </Link>

                    <Link
                      to="/my-courses"
                      className="dropdown-item"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Khóa học của tôi
                    </Link>

                    <Link
                      to="/progress"
                      className="dropdown-item"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M22 12h-4l-3 9L9 3l-3 9H2"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Tiến độ học tập
                    </Link>

                    {(user?.role === 'admin' || user?.role === 'teacher') && (
                      <Link
                        to="/admin"
                        className="dropdown-item"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M22 12h-4l-3 9L9 3l-3 9H2"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Trang Quản Lí
                      </Link>
                    )}

                    <Link
                      to="/settings"
                      className="dropdown-item"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                        <path
                          d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                      Cài đặt
                    </Link>
                  </div>

                  <div className="dropdown-divider" />

                  <div className="dropdown-footer">
                    <button className="dropdown-item logout-btn" onClick={()=> {dispatch(logout()); // clear user
                                                                                setIsUserDropdownOpen(false);}}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <polyline
                          points="16,17 21,12 16,7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <line
                          x1="21"
                          y1="12"
                          x2="9"
                          y2="12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Đăng xuất
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
              <button className="login-btn" onClick={() => setDialog("login")}>
              🔐 Đăng nhập
            </button>
              <LoginDialog open={openLogin} onOpenChange={setOpenLogin} />
              </>
            )}
          </li>
      </div>  
      <LoginDialog
        open={dialog === "login"}
        onOpenChange={() => setDialog(null)}
        onSwitchToRegister={() => setDialog("register")}
      />
      <RegisterDialog
        open={dialog === "register"}
        onOpenChange={() => setDialog(null)}
        onSwitchToLogin={() => setDialog("login")}
      />
    </nav>
  )
}
