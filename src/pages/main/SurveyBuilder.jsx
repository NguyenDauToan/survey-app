import React from "react";
import BuilderLayout from "./BuilderLayout";
import SidebarSlider from "./SidebarSlider";

export default function SurveyBuilder(props) {
  return (
    <div className="flex flex-1 h-full overflow-hidden">
      {/* BuilderLayout chiếm phần còn lại */}
      <div className="flex-1 min-w-0 overflow-auto">
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
          startSurvey={props.startSurvey}
        />
      </div>

      {/* SidebarSlider bên phải */}
      <div className="w-80 min-w-[300px] border-l overflow-y-auto">
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

