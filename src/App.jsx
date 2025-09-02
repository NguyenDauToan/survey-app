// src/App.jsx
import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import AppRouter from './routes/AppRouter'
import LoginDialog from './components/LoginDialog'
import RegisterDialog from './components/RegisterDialog'
// Hàm tạo ID ngẫu nhiên
const genId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : Date.now().toString()

const initialForm = {
  id: genId(),
  title: 'Untitled Form',
  description: '',
  questions: [],
  responses: []
}

export const AuthContext = React.createContext();

export default function App() {
  const [user, setUser] = useState(null)
  const [dialog, setDialog] = useState(null); // "login" | "register" | null
  const [form, setForm] = useState(() => {
    try {
      const saved = localStorage.getItem('surveyForm')
      return saved ? JSON.parse(saved) : initialForm
    } catch {
      return initialForm
    }
  })

  useEffect(() => {
    localStorage.setItem('surveyForm', JSON.stringify(form))
  }, [form])

  // Các handler
  const handleAdd = (type) => {
    const newQuestion = {
      id: genId(),
      type,
      title: 'Untitled Question',
      options:
        ['multiple_choice', 'checkboxes', 'dropdown'].includes(type)
          ? ['Option 1']
          : [],
      required: false
    }
    setForm((f) => ({ ...f, questions: [...f.questions, newQuestion] }))
  }

  const handleDelete = (id) => {
    setForm((f) => ({ ...f, questions: f.questions.filter(q => q.id !== id) }))
  }

  const handleDuplicate = (id) => {
    setForm((f) => {
      const q = f.questions.find(q => q.id === id)
      if (!q) return f
      const copy = { ...q, id: genId() }
      return { ...f, questions: [...f.questions, copy] }
    })
  }

  const handleMove = (id, dir) => {
    setForm(f => {
      const idx = f.questions.findIndex(q => q.id === id)
      if (idx < 0) return f

      const newIdx = idx + dir
      if (newIdx < 0 || newIdx >= f.questions.length) return f

      const newQuestions = [...f.questions]
      const [removed] = newQuestions.splice(idx, 1)
      newQuestions.splice(newIdx, 0, removed)

      return { ...f, questions: newQuestions }
    })
  }

  // Chia sẻ link
  const shareFillLink = () => {
    const url = `${window.location.origin}/fill?form=${form.id}`
    navigator.clipboard.writeText(url).then(() => alert('Đã copy link: ' + url))
  }

  // Export JSON
  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(form, null, 2)], { type: 'application/json' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'form.json'
    link.click()
  }

  // Import JSON
  const importJSON = (e) => {
    const files = e.target?.files
    if (!files?.length) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result)
        if (parsed?.id && Array.isArray(parsed.questions)) {
          setForm(parsed)
        } else {
          alert('File JSON không hợp lệ!')
        }
      } catch (err) {
        alert('Lỗi khi đọc file JSON!')
        console.error(err)
      }
    }
    reader.readAsText(files[0])
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <Header
        onShare={shareFillLink}
        onExport={exportJSON}
        onImport={importJSON}
      />
      <AppRouter
        form={form}
        setForm={setForm}
        handlers={{ handleAdd, handleDelete, handleDuplicate, handleMove }}
      />
     
    </div>
  )
}
