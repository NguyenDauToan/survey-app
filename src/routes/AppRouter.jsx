import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Fill from '../components/Fill'
import Results from '../components/Results'
import Dashboard from '@/pages/admin/Dashboard'
import AdminLayout from '@/layouts/AdminLayout'
import RequireAdmin from '@/routes/RequireAdmin'
import FormBuilder from '@/pages/FormBuilder'
export default function AppRouter({ form, setForm }) {
  return (
    <Routes>
      
      <Route index element={<FormBuilder />} />
      <Route path="/fill" element={<Fill form={form} setForm={setForm} />} />
      <Route path="/results" element={<Results form={form} />} />
      <Route element={<RequireAdmin />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />         {/* /admin */}
          <Route path="Dashboard" element={<Dashboard />} /> {/* /admin/dashboard */}
        </Route>
      </Route>
    </Routes>
  )
}
