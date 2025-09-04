// LoginDialog.jsx
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { login } from "@/redux/authSlice";
import { useNavigate } from "react-router-dom";
import { apiLogin } from "@/api/api";
import "../styles/login.css";

export default function LoginDialog({ open, onOpenChange, onSwitchToRegister, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    onOpenChange(false);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await apiLogin(email, password);
      console.log("API login response:", data);
      if (data.user && data.token) {
        dispatch(login({ user: data.user, token: data.token }));
        localStorage.setItem("token", data.token);
        alert(data.message || "Đăng nhập thành công")
        onOpenChange(false);
        onLoginSuccess?.(data.user);
        navigate("/");
      } else {
        setError(data.message || "Sai tài khoản hoặc mật khẩu!");
      }
    } catch (err) {
      console.error("Lỗi đăng nhập:", err);
      setError("Không thể kết nối server!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Đăng nhập</DialogTitle>
      <DialogContent>
        <form
          className="login-form"
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}
        >
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Label>Mật khẩu</Label>
          <Input
            type="password"
            name="mat_khau"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p style={{ color: "red", marginTop: "0.5rem" }}>{error}</p>}

          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
        </form>

        <p style={{ marginTop: "1rem", textAlign: "center" }}>
          Chưa có tài khoản?{" "}
          <Button variant="text" onClick={onSwitchToRegister}>
            Đăng ký ngay
          </Button>
        </p>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Hủy</Button>
      </DialogActions>
    </Dialog>
  );
}
