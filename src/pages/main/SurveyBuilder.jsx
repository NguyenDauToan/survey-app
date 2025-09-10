import React from "react";
import BuilderLayout from "./BuilderLayout";
import SidebarSlider from "./SidebarSlider";

export default function SurveyBuilder(props) {
  return (
    <div className="flex flex-1 overflow-hidden">
      {/* BuilderLayout chiếm bên trái */}
      <div className="flex-1 overflow-hidden">
        <BuilderLayout
          title={props.title}
          setTitle={props.setTitle}
          description={props.description}
          setDescription={props.setDescription}
          questions={props.questions}
          addQuestion={props.addQuestion}
          deleteQuestion={props.deleteQuestion}
          duplicateQuestion={props.duplicateQuestion}
          skipHelloPage={props.skipHelloPage}
          backgroundImage={props.backgroundImage}
        />
      </div>

      {/* SidebarSlider bên phải */}
      <div className="w-80 border-l overflow-y-auto">
        <SidebarSlider
          skipHelloPage={props.skipHelloPage}
          setSkipHelloPage={props.setSkipHelloPage}
          surveyTemplates={props.surveyTemplates}
          chooseTemplate={props.chooseTemplate}
          backgroundImage={props.backgroundImage}
        />
      </div>
    </div>
  );
}
