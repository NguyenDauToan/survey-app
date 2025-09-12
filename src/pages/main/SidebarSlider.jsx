import React from "react";
import "../../styles/SliderBar.css"
import { useState } from "react";
export default function SidebarSlider({
  step,
  skipHelloPage,
  setSkipHelloPage,
  surveyTemplates,
  chooseTemplate,
  backgroundImage,
  setQuestionType,
}) {
  // upload ảnh mới
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        chooseTemplate(ev.target.result); // base64 ảnh
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4 space-y-6">
      {step === "builder" && (
        <>
          <div className="p-4 rounded-lg border transition duration-200 group hover:bg-gray-50 hover:shadow-md">
            <h3 className="text-lg font-semibold">Trang bắt đầu</h3>
            <div className="type-box">
              <span className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={skipHelloPage}
                  onChange={(e) => setSkipHelloPage(e.target.checked)}
                />
                Bỏ qua trang bắt đầu
              </span>
            </div>
          </div>
          <div className="p-4 rounded-lg border transition duration-200 group hover:bg-gray-50 hover:shadow-md">

            <label className="block mt-3">
              <span className="text-sm group-hover:text-indigo-600 transition">
                Đổi ảnh nền
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="mt-2 block w-full text-sm border rounded p-1 transition
                 group-hover:border-indigo-500 group-hover:bg-gray-100 cursor-pointer"
              />
            </label>
          </div>
        </>
      )}

      {step === "question" && (
        <>
          <div className="question-type-box">
            <h3 className="text-lg font-semibold" style={{ fontSize: 15 }}>
              Loại câu hỏi
            </h3>

            <select
              className="mt-2 w-full border rounded p-2 text-sm"
              onChange={(e) => setQuestionType(e.target.value)}
            >
              <option value="">-- Chọn loại câu hỏi --</option>
              <option value="multiple-choice">Multiple Choice</option>
              <option value="checkbox">Checkbox</option>
              <option value="rating">Rating</option>
              <option value="text">Text</option>
            </select>
          </div>

          <div className="question-type-box">
            <h4 className="text-lg font-semibold" style={{ fontSize: 15 }}>
              Bắt buộc trả lời
            </h4>

            <div className="right-side">
              <span className="label-text">Bắt buộc</span>
              <label className="toggle-switch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
            </div>
          </div>

          <div className="question-type-box">
            <h5 className="text-lg font-semibold" style={{ fontSize: 15 }}>
              Số lần tham gia trả lời
            </h5>
            <input
              type="number"
              className="answer-input"
              placeholder="Nhập số lần..."
            />
          </div>

          <div className="question-type-box">
            <h4 className="text-lg font-semibold" style={{ fontSize: 15 }}>
              Xáo vị trí câu hỏi
            </h4>

            <div className="right-side">
              <label className="new toggle-switch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
