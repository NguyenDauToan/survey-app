import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Builder from '../components/Builder'
import Fill from '../components/Fill'
import Results from '../components/Results'

export default function AppRouter({ form, setForm, handlers }) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Builder
            form={form}
            setForm={setForm}
            onAdd={handlers.handleAdd}
            onDelete={handlers.handleDelete}
            onDuplicate={handlers.handleDuplicate}
            onMove={handlers.handleMove}
          />
        }
      />
      <Route path="/fill" element={<Fill form={form} setForm={setForm} />} />
      <Route path="/results" element={<Results form={form} />} />
    </Routes>
  )
}
