import React from "react";
import BuilderLayout from "./BuilderLayout";
import SidebarSlider from "./SidebarSlider";
import QuestionForm from "./QuestionForm";

export default function SurveyBuilder(props) {
  return (
    <div className="flex h-screen">
      {/* Bên trái có scroll riêng */}
      <div className="flex-1 min-w-0 h-screen overflow-y-auto">
        {props.step === "builder" && (
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
        )}

        {props.step === "question" && (
          <QuestionForm
            title={props.title}
            description={props.description}
            questions={props.questions}
            answers={props.answers}
            setAnswers={props.setAnswers}
            backgroundImage={props.backgroundImage}

            // thêm vào đây
            setQuestions={props.setQuestions}
            addQuestion={props.addQuestion}
          />
        )}
      </div>

      {/* SidebarSlider cố định bên phải */}
      <div className="w-80 min-w-[300px] h-screen border-l overflow-y-auto">
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
