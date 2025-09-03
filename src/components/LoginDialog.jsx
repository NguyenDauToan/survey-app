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

export default function LoginDialog({ open, onOpenChange,onSwitchToRegister,onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleClose = () => {
    onOpenChange(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const data = await apiLogin(email, password);
  
      if (data.success && data.token && data.user) {
        // login thành công
        dispatch(login({ user: data.user, token: data.token }));
        localStorage.setItem("token", data.token);
        alert(`Xin chào ${data.user.displayName || data.user.email}`);
        onOpenChange(false);
        navigate("/");
      } else {
        alert(data.message || "Sai tài khoản hoặc mật khẩu!");
      }
    } catch (err) {
      console.error("❌ Lỗi đăng nhập:", err);
      alert("Không thể kết nối server!");
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Label>Mật khẩu</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" style={{ marginTop: "1rem" }}>
            Đăng nhập
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
