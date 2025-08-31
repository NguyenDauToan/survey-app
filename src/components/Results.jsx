import React from "react";

export default function Results({ form }) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Results</h2>
      <p className="mb-2">Total responses: {form.responses.length}</p>
      {form.responses.map((res) => (
        <div key={res.id} className="border p-3 mb-3 rounded bg-white">
          {form.questions.map((q) => (
            <p key={q.id}>
              <b>{q.text}:</b> {res.answers[q.id] || "-"}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
