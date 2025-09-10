import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/authSlice";

import Header from "./components/Header";
import AppRouter from "./routes/AppRouter";
import LoginDialog from "./components/LoginDialog";
import RequireAdmin from "./routes/RequireAdmin";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";

export default function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [dialog, setDialog] = useState(null);
  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem("surveyForm");
    return saved
      ? JSON.parse(saved)
      : {
          id: Date.now().toString(),
          title: "Untitled Form",
          description: "",
          questions: [],
          responses: [],
        };
  });

  // load user từ localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");
    if (savedUser && savedToken) {
      const userObj = JSON.parse(savedUser);
      dispatch(login({ user: userObj, token: savedToken }));
    }
  }, [dispatch]);

  // lưu form
  useEffect(() => {
    localStorage.setItem("surveyForm", JSON.stringify(form));
  }, [form]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* Admin routes */}
        <Route element={<RequireAdmin />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="documents" element={<div>Tài liệu</div>} />
            <Route path="podcasts" element={<div>Podcast</div>} />
            <Route path="analytics" element={<div>Analytics</div>} />
          </Route>
        </Route>

        {/* User routes */}
        <Route
          path="/*"
          element={
            <>
              <Header onLogin={() => setDialog("login")} user={user} />
              <AppRouter form={form} setForm={setForm} />
            </>
          }
        />
      </Routes>

      {/* Login Dialog - chỉ một lần */}
      <LoginDialog
        open={dialog === "login"}
        onOpenChange={(val) => setDialog(val ? "login" : null)}
      />
    </div>
  );
}
