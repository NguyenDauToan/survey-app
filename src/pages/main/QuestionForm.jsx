import React, { useState } from "react";
import "../../styles/QuestionForm.css";
import QuestionTypeSelector from "./QuestionTypeSelector";
import { ChevronLeft, ChevronRight, Plus, Check } from "lucide-react";

export default function QuestionForm({
    description,
    setDescription,
    questions,
    setQuestions,
    setAnswers,
    answers,
    backgroundImage,
}) {
    const [activeId, setActiveId] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(""); // câu hỏi đang nhập

    const defaultBg = "/img/anh-dep-68.jpg";
    const bg = backgroundImage || defaultBg;

    // chuyển sang câu hỏi theo id
    const updateCurrentQuestion = (id) => {
        setActiveId(id);
    };

    // thêm câu hỏi mới
    const addQuestion = () => {
        if (!currentQuestion.trim()) return;

        const newQuestion = {
            id: questions.length + 1,
            text: currentQuestion,
        };

        setQuestions([...questions, newQuestion]);
        setActiveId(newQuestion.id); // chọn câu mới làm active
        setCurrentQuestion(""); // reset input
    };

    // sang câu trước
    const prevQuestion = () => {
        if (activeId > 1) setActiveId(activeId - 1);
    };

    // sang câu tiếp theo
    const nextQuestion = () => {
        if (activeId < questions.length) setActiveId(activeId + 1);
    };

    return (
        <div
            className="w-full relative flex flex-col"
            style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Lớp phủ mờ */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Nội dung chính */}
            <div className="relative z-10 max-w-3xl mx-auto p-6 flex flex-col flex-1 overflow-y-auto pb-32">
                {/* Ô nhập câu hỏi */}
                <div className="title-descripton p-6 text-center mb-6">
                    <input
                        type="text"
                        value={currentQuestion}
                        onChange={(e) => setCurrentQuestion(e.target.value)}
                        placeholder="Nhập câu hỏi tại đây"
                        className="w-full p-3 text-white text-4xl text-center bg-transparent rounded outline-none border-none focus:border-white"
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Nhập mô tả"
                        className="textarea-none w-full p-3 text-white text-xl text-center rounded outline-none min-h-[120px]"
                    />
                </div>

                {/* Danh sách câu hỏi */}
                <div className="space-y-3">
                    <QuestionTypeSelector
                        onSelect={(type) => console.log("Chọn:", type)}
                    />

                    {questions.map((q) => (
                        <div
                            key={q.id}
                            onClick={() => updateCurrentQuestion(q.id)}
                            className={`p-4 rounded cursor-pointer flex justify-between items-center ${activeId === q.id
                                    ? "bg-teal-600 text-white"
                                    : "bg-white/10 text-white hover:bg-white/20"
                                }`}
                        >
                            <span>
                                {q.id}. {q.text}
                            </span>
                            {activeId === q.id && <Check className="w-5 h-5" />}
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer dạng bảng ẩn/hiện */}
            {questions.length > 0 && (
                <div className="fixed bottom-0 left-0 w-full group">
                    {/* khi chưa hover: chỉ thấy mép */}
                    <div className="h-10 bg-gray-200/70 border-t border-gray-300 cursor-pointer group-hover:h-36 transition-all duration-300 ease-in-out overflow-hidden">
                        <div className="w-full h-full bg-white shadow-lg flex items-center px-6 gap-4 overflow-x-auto">
                            {/* nút prev */}
                           

                            {/* danh sách câu hỏi */}
                            <div className="flex gap-4">
                                {questions.map((q) => (
                                    <div
                                        key={q.id}
                                        onClick={() => updateCurrentQuestion(q.id)}
                                        className={`w-16 h-16 flex items-center justify-center border rounded-lg shadow cursor-pointer text-lg font-semibold transition ${activeId === q.id
                                                ? "bg-teal-500 text-white"
                                                : "hover:bg-gray-100"
                                            }`}
                                    >
                                        {q.id}
                                    </div>
                                ))}

                                {/* nút thêm câu hỏi */}
                                <div
                                    onClick={addQuestion}
                                    className="w-16 h-16 flex flex-col items-center justify-center border rounded-lg shadow cursor-pointer hover:bg-gray-100"
                                >
                                    <span className="text-2xl">+</span>
                                    <span className="text-xs">Thêm</span>
                                </div>
                            </div>

                            {/* nút next */}
                           
                        </div>
                    </div>
                </div>
            )}


            {/* Nút thêm câu hỏi nổi bên phải */}
            <button
                onClick={addQuestion}
                className="fixed right-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-lg hover:bg-teal-500"
            >
                <Plus className="w-6 h-6" />
            </button>
        </div>
    );
}
