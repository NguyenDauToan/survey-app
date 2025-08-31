import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

export default function QuestionEditor({ question, onSave, onCancel }) {
  const [text, setText] = useState(question?.text || "")
  const [type, setType] = useState(question?.type || "text")
  const [options, setOptions] = useState(question?.options || [""])

  const handleOptionChange = (index, value) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  const addOption = () => setOptions([...options, ""])
  const removeOption = (index) => setOptions(options.filter((_, i) => i !== index))

  const handleSave = () => {
    const updatedQuestion = {
      ...question,
      text,
      type,
      options: type === "choice" ? options.filter((o) => o.trim() !== "") : [],
    }
    if (typeof onSave === "function") {
      onSave(updatedQuestion)
    } else {
      console.warn("⚠️ onSave is not provided to QuestionEditor")
    }
  }

  return (
    <Card className="border rounded-2xl shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          {question ? "Edit Question" : "New Question"}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Câu hỏi */}
        <div>
          <label className="block text-sm font-medium mb-1">Question Text</label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your question..."
          />
        </div>

        {/* Tabs chọn loại câu hỏi */}
        <Tabs value={type} onValueChange={setType}>
          <TabsList>
            <TabsTrigger value="text">Text Answer</TabsTrigger>
            <TabsTrigger value="choice">Multiple Choice</TabsTrigger>
          </TabsList>

          {/* Trả lời text */}
          <TabsContent value="text" className="mt-3">
            <p className="text-sm text-gray-500">Users will type their answer.</p>
          </TabsContent>

          {/* Trắc nghiệm */}
          <TabsContent value="choice" className="mt-3 space-y-2">
            {options.map((opt, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <Input
                  value={opt}
                  onChange={(e) => handleOptionChange(idx, e.target.value)}
                  placeholder={`Option ${idx + 1}`}
                />
                {options.length > 1 && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeOption(idx)}
                  >
                    ✕
                  </Button>
                )}
              </div>
            ))}
            <Button variant="secondary" size="sm" onClick={addOption}>
              + Add Option
            </Button>
          </TabsContent>
        </Tabs>

        {/* Action */}
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
