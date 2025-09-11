import React, { useState } from "react";
import "../styles/Formbuilder.css";
import { Link } from "react-router-dom";
import SurveyBuilder from "./main/SurveyBuilder";

export default function FormBuilder() {
  const [step, setStep] = useState("builder");
  const [title, setTitle] = useState("Khảo sát không có tiêu đề");
  const [answers, setAnswers] = useState({});
  const [description, setDescription] = useState("Nhập mô tả...");
  const [questions, setQuestions] = useState([
    { id: Date.now(), text: "Câu hỏi 1", type: "text" },
  ]);

  // state Survey
  const [skipHelloPage, setSkipHelloPage] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("/img/anh-dep-68.jpg");
  const [surveyTemplates] = useState([
    "/img/anh-dep-68.jpg",
    "/img/anh-dep-68.jpg",
    "/img/template3.jpg",
  ]);

  // thêm câu hỏi
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: Date.now(), text: "Câu hỏi mới", type: "text" },
    ]);
  };

  // xóa câu hỏi
  const deleteQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  // nhân bản câu hỏi
  const duplicateQuestion = (id) => {
    const q = questions.find((q) => q.id === id);
    if (q) {
      setQuestions([...questions, { ...q, id: Date.now() }]);
    }
  };

  // chọn template
  const chooseTemplate = (template) => {
    setBackgroundImage(template);
  };

  // bắt đầu khảo sát
  const startSurvey = () => {
    console.log("Survey started!");
  };

  return (
    <div className="build-form min-h-screen bg-gray-100 flex flex-col">
      {/* Thanh điều hướng */}
      <div
        className="list-name"
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <Link className="start" onClick={() => setStep("builder")} style={{ fontSize: 18 }}>
          Trang bắt đầu
        </Link>
        <Link
          className="question-table"
          style={{ fontSize: 18 }}
          onClick={() => setStep("question")} // đổi giao diện bên trái
        >
          Bảng hỏi
        </Link>
        <Link className="finished" style={{ fontSize: 18 }}>
          Trang kết thúc
        </Link>
        <Link className="completed" style={{ fontSize: 18 }}>
          Hoàn tất
        </Link>
        <Link className="share" style={{ fontSize: 18 }}>
          Chia sẻ
        </Link>
        <button className="btn-save">Đã lưu</button>
        <button className="btn-task">Tác vụ khác</button>
      </div>

      {/* SurveyBuilder bọc cả BuilderLayout + SidebarSlider */}
      <SurveyBuilder
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        questions={questions}
        setQuestions={setQuestions}
        addQuestion={addQuestion}
        deleteQuestion={deleteQuestion}
        duplicateQuestion={duplicateQuestion}
        skipHelloPage={skipHelloPage}
        setSkipHelloPage={setSkipHelloPage}
        backgroundImage={backgroundImage}
        surveyTemplates={surveyTemplates}
        chooseTemplate={chooseTemplate}
        startSurvey={startSurvey}
        step={step}
        setStep={setStep}
        answers={answers}
        setAnswers={setAnswers}
      />
    </div>
  );
}
