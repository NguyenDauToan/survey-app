import React, { useEffect, useRef } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { login } from "@/redux/authSlice";
import { useNavigate } from "react-router-dom";

export default function LoginDialog({ open, onOpenChange }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const googleButtonRef = useRef(null);

  const handleCredentialResponse = async (response) => {
    console.log("Google credential:", response);
    try {
      const res = await fetch(
        "https://survey-server-m884.onrender.com/api/auth/google/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id_token: response.credential }),
        }
      );

      const text = await res.text();
      console.log("Raw response from server:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error("Server trả về không phải JSON:", text);
        alert("Đăng nhập thất bại");
        return;
      }

      if (data.user && data.token) {
        const user = {
          ...data.user,
          Ten: data.user.ten, // map từ backend
          role: data.user.vai_tro ? "admin" : "user",
        };

        dispatch(login({ user, token: data.token }));
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(user));

        if (user.role === "admin") navigate("/admin");
        else navigate("/");

        onOpenChange(false);
      } else {
        alert("Đăng nhập thất bại");
      }
    } catch (err) {
      console.error("Lỗi khi đăng nhập Google:", err);
      alert("Lỗi khi đăng nhập Google");
    }
  };

  useEffect(() => {
    if (!open) return;

    const renderGoogleButton = () => {
      if (!window.google || !googleButtonRef.current) return;

      // Xóa nút cũ nếu có
      googleButtonRef.current.innerHTML = "";

      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(googleButtonRef.current, {
        theme: "outline",
        size: "large",
        width: "100%",
      });

      // optional: prompt Google One Tap (nếu muốn)
      // window.google.accounts.id.prompt();
    };

    // requestAnimationFrame + setTimeout để đảm bảo Dialog fully mount
    const rafId = requestAnimationFrame(() => setTimeout(renderGoogleButton, 50));

    return () => cancelAnimationFrame(rafId);
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={() => onOpenChange(false)}
      PaperProps={{ sx: { borderRadius: 4, width: "400px", padding: 4 } }}
    >
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
        Đăng nhập với Google
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        <div ref={googleButtonRef} style={{ width: "100%" }}></div>
        <div style={{ textAlign: "center", fontSize: "0.9rem", color: "gray" }}>
          Chỉ cần tài khoản Google để đăng nhập
        </div>
        <Button
          variant="outlined"
          onClick={() => onOpenChange(false)}
          sx={{ mt: 2, width: "100%" }}
        >
          Hủy
        </Button>
      </DialogContent>
    </Dialog>
  );
}
