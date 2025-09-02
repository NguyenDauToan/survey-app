export const QuestionTypes = [
  'short_text',
  'long_text',
  'multiple_choice',
  'checkboxes',
  'dropdown',
  'linear_scale',
  'date',
  'time'
]

export const blankForm = (uid, now, defaultQuestion) => ({
  id: uid(),
  title: 'Untitled form',
  description: '',
  questions: [defaultQuestion('short_text')],
  createdAt: now()
})
