import React, { useState } from "react";

export default function Fill({ form, setForm }) {
  const [answers, setAnswers] = useState({});

  const submit = () => {
    const response = { id: Date.now(), answers };
    setForm({ ...form, responses: [...form.responses, response] });
    alert("Submitted!");
    setAnswers({});
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">{form.title}</h2>
      <p className="mb-4">{form.description}</p>
      {form.questions.map((q) => (
        <div key={q.id} className="mb-3">
          <p className="font-medium">
            {q.text} {q.required && <span className="text-red-500">*</span>}
          </p>
          {q.type === "text" && (
            <input
              className="border w-full p-1"
              value={answers[q.id] || ""}
              onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
            />
          )}
          {q.type === "textarea" && (
            <textarea
              className="border w-full p-1"
              value={answers[q.id] || ""}
              onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
            />
          )}
        </div>
      ))}
      <button onClick={submit} className="px-3 py-1 rounded bg-green-600 text-white">
        Submit
      </button>
    </div>
  );
}
