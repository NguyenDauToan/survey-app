import React from "react";
import "../../styles/BuilderLayout.css";

export default function BuilderLayout({
  title,
  setTitle,
  description,
  setDescription,
  backgroundImage,
  startSurvey,
  setStep,
}) {
  const defaultBg = "/img/anh-dep-68.jpg";
  const bg = backgroundImage || defaultBg;

  return (
    <div
      className="w-full min-h-screen relative"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 p-5 max-w-3xl mx-auto">
        {/* Tiêu đề */}
        <div className="survey-title mb-4">
          <input
            type="text"
            placeholder="Nhập tiêu đề"
            className="w-full p-3 text-white text-4xl text-center bg-transparent rounded outline-none border-none focus:border-white"
        
          />
        </div>

        {/* Mô tả */}
        <div className="question-description mb-5">
          <textarea
            placeholder="Nhập mô tả tại đây"
            className="textarea-none w-full p-3 text-white text-base text-4xl text-center rounded outline-none min-h-[120px]"
          />
        </div>

        {/* Nút bắt đầu */}
        <div className="survey-button">
          <button
            type="button"
            onClick={() => setStep("question")} // đổi giao diện bên trái
            className="bg-teal-700 text-white rounded-full px-6 py-3 flex items-center gap-2"
          >
            <span>Bắt đầu</span>
            <i className="fa fa-chevron-right"></i>
          </button>
          
        </div>
      </div>
    </div>
  );
}
