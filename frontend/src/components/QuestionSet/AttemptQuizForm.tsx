import "../../css/AttemptQuiz.css";
import React, { useState } from "react";
import type { IAttempQuestionForm } from "../../pages/QuestionSet/AttemptQuizPage";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import axios from "axios";

export interface IAttemptQuizFinalData {
  questionSet: string;
  responses: {
    questionId: string;
    selectedChoicesIds: string[];
  }[];
}

function AttemptQuizForm({
  questionSet,
}: {
  questionSet: IAttempQuestionForm;
}) {
  const [result, setResult] = useState(null);
  const defaultValues: IAttempQuestionForm = {
    ...questionSet,
  };
  const methods = useForm({ defaultValues });

  const { watch, register, handleSubmit } = methods;
  console.log("form values => ", watch());

  const onSubmitHandler = (data: IAttempQuestionForm) => {
    const accessToken = localStorage.getItem("accessToken");

    const finalData: IAttemptQuizFinalData = {
      questionSet: data?._id,
      responses: data?.questions?.map((question) => {
        return {
          questionId: question?._id,
          selectedChoicesIds: question?.choices
            ?.filter((choice) => choice?.selected)
            ?.map((ch) => ch?._id),
        };
      }),
    };

    axios
      .post("http://localhost:3000/api/questions/answer/attempt", finalData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        alert("Answer Set Updated Successfully");
        setResult(res.data.data);
      })
      .catch((err) => {});
  };

  if (result) {
    return (
      <p className="quiz-result">
        Your Score is <strong>{result?.score || 0}</strong> out of{" "}
        <strong>{result?.total || 0}</strong> questions attempted.
      </p>
    );
  }
  return (
    <div className="attempt-quiz-form">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="form-group">
            <label className="form-label">Enter Title</label>
            <input
              {...register("title")}
              placeholder="Enter Title"
              className="form-input"
            />
          </div>
          <CreateQuestions />
          <button type="submit" className="submit-btn">
            Submit Answer
          </button>
        </form>
      </FormProvider>
    </div>
  );
}

function CreateQuestions() {
  const { control } = useFormContext<IAttempQuestionForm>();

  const { fields } = useFieldArray({
    control,
    name: "questions",
  });

  return (
    <div className="questions-container">
      <h2 className="section-title">Questions</h2>
      {fields?.map((field, index) => {
        return (
          <div className="question-card" key={index}>
            <p className="question-text">{field?.questionText}</p>
            <CreateChoices questionIndex={index} />
          </div>
        );
      })}
    </div>
  );
}

function CreateChoices({ questionIndex }: { questionIndex: number }) {
  const { register, control } = useFormContext<IAttempQuestionForm>();

  const { fields } = useFieldArray({
    control,
    name: `questions.${questionIndex}.choices`,
  });

  return (
    <div className="choices-container">
      {fields?.map((field, index) => {
        return (
          <div className="choice-item" key={index}>
            <input
              type="checkbox"
              {...register(
                `questions.${questionIndex}.choices.${index}.selected`
              )}
            />
            <label>{field?.text}</label>
          </div>
        );
      })}
    </div>
  );
}

export default AttemptQuizForm;
