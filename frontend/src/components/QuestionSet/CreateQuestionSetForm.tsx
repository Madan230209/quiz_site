import "../../css/CreateQuestion.css"
import axios from "axios";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";

export interface QuestionSetForm {
  title: string;
  questions: {
    questionText: string;
    choices: { text: string; label: string; correctAnswer: boolean }[];
  }[];
}

function CreateQuestionSetForm() {
  const defaultValues: QuestionSetForm = {
    title: "",
    questions: [
      {
        questionText: "",
        choices: [],
      },
    ],
  };

  const methods = useForm({ defaultValues });
  const { watch, register, handleSubmit } = methods;
  console.log("form values => ", watch());

  const onSubmitHandler = (data: QuestionSetForm) => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .post("http://localhost:3000/api/admin/questionset/create", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        alert("Question Set Created Successfully");
      })
      .catch(() => {});
  };

  return (
    <div className="question-set-container">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmitHandler)} className="question-set-form">
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
            Create Question Set
          </button>
        </form>
      </FormProvider>
    </div>
  );
}

function CreateQuestions() {
  const { register, control } = useFormContext<QuestionSetForm>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const AddQuestionHandler = () => {
    append({
      choices: [],
      questionText: "",
    });
  };

  return (
    <div className="questions-section">
      <h2 className="section-title">Create Questions</h2>
      {fields?.map((field, index) => {
        const RemoveQuestionHandler = () => {
          remove(index);
        };
        return (
          <div key={index} className="question-block">
            <input
              {...register(`questions.${index}.questionText`)}
              placeholder="Enter Question"
              className="form-input"
            />
            <button
              type="button"
              className="remove-btn"
              onClick={RemoveQuestionHandler}
            >
              Remove
            </button>
            <CreateChoices questionIndex={index} />
          </div>
        );
      })}

      <button type="button" onClick={AddQuestionHandler} className="add-btn">
        Add Question
      </button>
    </div>
  );
}

function CreateChoices({ questionIndex }: { questionIndex: number }) {
  const { register, control } = useFormContext<QuestionSetForm>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${questionIndex}.choices`,
  });

  const AddChoicesHandler = () => {
    append({
      label: fields?.length.toString(),
      text: "",
      correctAnswer: false,
    });
  };

  return (
    <div className="choices-section">
      {fields?.map((field, index) => {
        const RemoveChoiceHandler = () => {
          remove(index);
        };
        return (
          <div key={index} className="choice-block">
            <input
              type="checkbox"
              {...register(
                `questions.${questionIndex}.choices.${index}.correctAnswer`
              )}
              className="choice-checkbox"
            />
            <input
              {...register(`questions.${questionIndex}.choices.${index}.text`)}
              placeholder="Enter Choice"
              className="form-input"
            />
            <button
              type="button"
              className="remove-btn"
              onClick={RemoveChoiceHandler}
            >
              Remove Choice
            </button>
          </div>
        );
      })}
      <button type="button" onClick={AddChoicesHandler} className="add-btn">
        Add Choice
      </button>
    </div>
  );
}

export default CreateQuestionSetForm;
