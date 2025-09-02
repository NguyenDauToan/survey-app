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
  
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await res.json();
    if (res.ok && data.success) { // API trả về user có displayname
      dispatch(login(data.user));
      alert(`Xin chào ${data.user.displayname}`);
      onOpenChange(false);
      navigate("/");
    } else {
      alert(data.message || "Sai tài khoản hoặc mật khẩu!");
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
