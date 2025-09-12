import React, { useState } from "react";
import "../../styles/QuestionForm.css";
import QuestionTypeSelector from "./QuestionTypeSelector";
import { Plus, Check } from "lucide-react";

export default function QuestionForm({
    description,
    setDescription,
    questions,
    setQuestions,
    setAnswers,
    answers,
    backgroundImage,
    questionType,
    setQuestionType,
}) {
    const [activeId, setActiveId] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState("");

    const defaultBg = "/img/anh-dep-68.jpg";
    const bg = backgroundImage || defaultBg;

    // thêm câu hỏi mới
    // thêm câu hỏi mới
    const addQuestion = () => {
        if (!currentQuestion.trim()) return;

        const newQuestion = {
            id: questions.length + 1,
            text: currentQuestion,
            type: questionType || "text",
            answers:
                questionType === "multiple-choice" || questionType === "checkbox"
                    ? [""]
                    : [], // 👈 thêm ít nhất 1 input rỗng
        };

        setQuestions([...questions, newQuestion]);
        setActiveId(newQuestion.id);
        setCurrentQuestion("");
    };


    // xóa câu hỏi
    const deleteQuestion = (id) => {
        const filtered = questions.filter((q) => q.id !== id);
        setQuestions(filtered);

        if (activeId === id) {
            setActiveId(filtered.length > 0 ? filtered[0].id : null);
        }
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
            {/* lớp phủ mờ */}
            <div className="absolute inset-0 bg-black/40" />

            {/* nội dung */}
            <div className="relative z-10 max-w-3xl mx-auto p-6 flex flex-col flex-1 overflow-y-auto pb-32">
                {/* nhập câu hỏi */}
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

                {/* nếu chưa chọn loại thì hiện selector */}
                {!questionType ? (
                    <QuestionTypeSelector
                        onSelect={(type) => {
                            setQuestionType(type);

                            // mặc định tạo sẵn 1 câu hỏi trống
                            const newQuestion = {
                                id: questions.length + 1,
                                text: "",
                                type,
                                answers: [""], // chỉ 1 input rỗng
                            };
                            setQuestions([...questions, newQuestion]);
                            setActiveId(newQuestion.id);
                        }}
                    />
                ) : (
                    <div className="selector mt-6 p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg text-white">
                        <h4 className="text-lg font-semibold mb-4">Cấu hình câu hỏi</h4>

                        {/* Multiple Choice */}
                        {questionType === "multiple-choice" && (
                            <ul className="space-y-3">
                                {questions
                                    .find((q) => q.id === activeId)
                                    ?.answers.map((ans, i) => (
                                        <li
                                            key={i}
                                            className="flex items-center gap-3 p-2 bg-white/5 rounded-lg hover:bg-white/20 transition"
                                        >
                                            <input
                                                type="radio"
                                                name={`q-${activeId}`}
                                                disabled
                                                className="w-4 h-4 accent-teal-500"
                                            />
                                            <input
                                                type="text"
                                                value={ans}
                                                onChange={(e) => {
                                                    const updated = [...questions];
                                                    const qIndex = updated.findIndex((q) => q.id === activeId);
                                                    updated[qIndex].answers[i] = e.target.value;
                                                    setQuestions(updated);
                                                }}
                                                placeholder={`Nhập đáp án ${i + 1}`}
                                                className="flex-1 bg-transparent outline-none border-b border-white/30 focus:border-teal-400 transition"
                                            />
                                        </li>
                                    ))}
                            </ul>
                        )}

                        {/* Checkbox */}
                        {questionType === "checkbox" && (
                            <ul className="space-y-3">
                                {questions
                                    .find((q) => q.id === activeId)
                                    ?.answers.map((ans, i) => (
                                        <li
                                            key={i}
                                            className="flex items-center gap-3 p-2 bg-white/5 rounded-lg hover:bg-white/20 transition"
                                        >
                                            <input
                                                type="checkbox"
                                                disabled
                                                className="w-4 h-4 accent-teal-500"
                                            />
                                            <input
                                                type="text"
                                                value={ans}
                                                onChange={(e) => {
                                                    const updated = [...questions];
                                                    const qIndex = updated.findIndex((q) => q.id === activeId);
                                                    updated[qIndex].answers[i] = e.target.value;
                                                    setQuestions(updated);
                                                }}
                                                placeholder={`Nhập lựa chọn ${i + 1}`}
                                                className="flex-1 bg-transparent outline-none border-b border-white/30 focus:border-teal-400 transition"
                                            />
                                        </li>
                                    ))}
                            </ul>
                        )}

                        {/* Rating */}
                        {questionType === "rating" && (
                            <div className="flex gap-3 justify-center">
                                {[1, 2, 3, 4, 5].map((n) => (
                                    <button
                                        key={n}
                                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-teal-500 transition shadow-md"
                                    >
                                        {n}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Text Answer */}
                        {questionType === "text" && (
                            <textarea
                                className="w-full p-3 rounded-lg bg-white/10 text-white outline-none focus:ring-2 focus:ring-teal-400 transition"
                                placeholder="Người dùng sẽ nhập câu trả lời..."
                                disabled
                            />
                        )}

                        {/* nút thêm đáp án */}
                        {(questionType === "multiple-choice" || questionType === "checkbox") && (
                            <div className="mt-6 text-center">
                                <button
                                    onClick={() => {
                                        const updated = [...questions];
                                        const qIndex = updated.findIndex((q) => q.id === activeId);
                                        updated[qIndex].answers.push(""); // thêm 1 input rỗng
                                        setQuestions(updated);
                                    }}
                                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-green-500 text-white font-medium shadow hover:opacity-90 transition"
                                >
                                    + Thêm đáp án
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* danh sách câu hỏi */}
                <div className="space-y-3 mt-6">
                    {questions.map((q) => (
                        <div
                            key={q.id}
                            className={`p-4 rounded cursor-pointer flex justify-between items-center ${activeId === q.id
                                ? "bg-teal-600 text-white"
                                : "bg-white/10 text-white hover:bg-white/20"
                                }`}
                        >
                            <span onClick={() => setActiveId(q.id)}>
                                {q.id}. {q.text}
                            </span>
                            <div className="flex items-center gap-2">
                                {activeId === q.id && <Check className="w-5 h-5" />}
                                <button
                                    onClick={() => deleteQuestion(q.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    X
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Footer dạng bảng ẩn/hiện */}
            {questions.length > 0 && (
                <div className="fixed bottom-0 left-0 w-full group">
                    {/* khi chưa hover: chỉ thấy mép */}
                    <div className="h-10 bg-gray-200/70 border-t border-gray-300 cursor-pointer group-hover:h-36 transition-all duration-300 ease-in-out overflow-hidden relative">
                        <div className="w-full h-full bg-white shadow-lg flex items-center px-6 gap-4 overflow-x-auto">
                            {/* danh sách câu hỏi */}
                            <div className="flex gap-4">
                                {questions.map((q) => (
                                    <div
                                        key={q.id}
                                        onClick={() => setActiveId(q.id)}
                                        className={`w-16 h-16 flex items-center justify-center border rounded-lg shadow cursor-pointer text-lg font-semibold transition relative ${activeId === q.id
                                                ? "bg-teal-500 text-white"
                                                : "hover:bg-gray-100"
                                            }`}
                                    >
                                        {q.id}
                                        {/* nút xóa */}
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation(); // tránh click nhầm vào chọn câu hỏi
                                                deleteQuestion(q.id);
                                            }}
                                            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs cursor-pointer"
                                        >
                                            ×
                                        </div>
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
                        </div>
                    </div>
                </div>
            )}
            {/* nút thêm câu hỏi nổi */}
            <button
                onClick={addQuestion}
                className="fixed right-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-lg hover:bg-teal-500"
            >
                <Plus className="w-6 h-6" />
            </button>
        </div>
    );
}
