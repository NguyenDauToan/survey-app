import QuestionEditor from './QuestionEditor'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Link } from "react-router-dom";

export default function Builder({ form, setForm, onAdd, onDelete, onDuplicate, onMove }) {
  // fallback để tránh lỗi
  const safeOnAdd = (type) => {
    if (typeof onAdd === 'function') {
      onAdd(type)
    } 
    // eslint-disable-next-line no-console
    else {
      console.warn('onAdd is not provided')
    }
  }

  const safeOnDelete = (id) => {
    if (typeof onDelete === 'function') {
      onDelete(id)
    }
  }

  const safeOnDuplicate = (id) => {
    if (typeof onDuplicate === 'function') {
      onDuplicate(id)
    }
  }

  const safeOnMove = (id, dir) => {
    if (typeof onMove === 'function') {
      onMove(id, dir)
    }
  }

  return (
    <div className='grid gap-4'>
      {form.questions.map((q, idx) => (
        <QuestionEditor
          key={q.id}
          q={q}
          idx={idx}
          total={form.questions.length}
          onChange={(newQ) =>
            setForm((f) => ({
              ...f,
              questions: f.questions.map((qq) =>
                qq.id === q.id ? newQ : qq
              ),
            }))
          }
          onDelete={() => safeOnDelete(q.id)}
          onDuplicate={() => safeOnDuplicate(q.id)}
          onMoveUp={() => safeOnMove(q.id, -1)}
          onMoveDown={() => safeOnMove(q.id, +1)}
        />
      ))}

      <Card className='rounded-2xl'>
        <CardContent className='p-4 flex flex-wrap gap-2'>
          <Button onClick={() => safeOnAdd('short_text')} variant='outline'>
            <Plus className='mr-2 h-4 w-4' /> Short
          </Button>
          <Button onClick={() => safeOnAdd('long_text')} variant='outline'>Paragraph</Button>
          <Button onClick={() => safeOnAdd('multiple_choice')} variant='outline'>Multiple</Button>
          <Button onClick={() => safeOnAdd('checkboxes')} variant='outline'>Checkboxes</Button>
          <Button onClick={() => safeOnAdd('dropdown')} variant='outline'>Dropdown</Button>
          <Button onClick={() => safeOnAdd('linear_scale')} variant='outline'>Scale</Button>
          <Button onClick={() => safeOnAdd('date')} variant='outline'>Date</Button>
          <Button onClick={() => safeOnAdd('time')} variant='outline'>Time</Button>

           <Link
        to="/admin"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Admin</Link>

        </CardContent>
      </Card>
    </div>
  )
}
