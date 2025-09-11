import React from "react";
import {
  CheckSquare,
  Image,
  Star,
  Sliders,
  Upload,
  BarChart,
  Database,
  Type,
} from "lucide-react"; // icon đẹp

export default function QuestionTypeSelector({ onSelect }) {
  const options = [
    { type: "multiple_choice", label: "Multiple Choice", icon: <CheckSquare /> },
    { type: "picture_choice", label: "Picture Choice", icon: <Image /> },
    { type: "form", label: "Form", icon: <Type /> },
    { type: "rating", label: "Rating", icon: <Star /> },
    { type: "slider", label: "Slider", icon: <Sliders /> },
    { type: "upload", label: "Upload File", icon: <Upload /> },
    { type: "ranking", label: "Ranking", icon: <BarChart /> },
    { type: "db_lookup", label: "DB Lookup", icon: <Database /> },
  ];

  return (
    <div className="grid grid-cols-2 gap-6 bg-black/60 p-6 rounded-lg shadow-lg">
      {options.map((opt) => (
        <div
          key={opt.type}
          onClick={() => onSelect(opt.type)}
          className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-lg text-white cursor-pointer hover:bg-white/20 transition"
        >
          <div className="text-3xl mb-2">{opt.icon}</div>
          <div className="text-sm">{opt.label}</div>
        </div>
      ))}
    </div>
  );
}
