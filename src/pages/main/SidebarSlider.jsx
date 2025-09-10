import React from "react";

export default function SidebarSlider({
  skipHelloPage,
  setSkipHelloPage,
  surveyTemplates,
  chooseTemplate,
  backgroundImage,
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
      <h2 className="text-lg font-semibold">Cài đặt khảo sát</h2>

      {/* Bỏ qua trang chào */}
      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={skipHelloPage}
            onChange={(e) => setSkipHelloPage(e.target.checked)}
          />
          Bỏ qua trang bắt đầu
        </label>
      </div>

      {/* Chọn template */}
    

        {/* Upload ảnh */}
        <label className="block">
          <span className="text-sm">Hoặc tải ảnh nền</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="mt-2 block w-full text-sm border rounded p-1"
          />
        </label>
      </div>
  );
}
