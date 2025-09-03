// RegisterDialog.jsx
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "@/redux/authSlice";
import { apiRegister } from "@/api/api";
import "../styles/register.css";

export default function RegisterDialog({ open, onOpenChange, onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    onOpenChange(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      const data = await apiRegister(email, password);

      if (data.success) {
        // đăng ký thành công
        dispatch(login({ user: data.user, token: data.token }));
        localStorage.setItem("token", data.token);
        alert("Đăng ký thành công!");
        onOpenChange(false);
        navigate("/");
      } else {
        // thất bại
        console.error("❌ Đăng ký thất bại", data.message);
        alert(data.message || "Không thể đăng ký!");
      }
    } catch (err) {
      console.error("⚠️ Lỗi kết nối backend:", err);
      alert("Không thể kết nối server! Hãy kiểm tra API_BASE hoặc backend.");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Đăng ký</DialogTitle>
      <DialogContent>
        <form
          className="register-form"
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
          <Label>Xác nhận mật khẩu</Label>
          <Input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" style={{ marginTop: "1rem" }}>
            Đăng ký
          </Button>
        </form>
        <p style={{ marginTop: "1rem", textAlign: "center" }}>
          Đã có tài khoản?{" "}
          <Button variant="text" onClick={onSwitchToLogin}>
            Đăng nhập
          </Button>
        </p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hủy</Button>
      </DialogActions>
    </Dialog>
  );
}
