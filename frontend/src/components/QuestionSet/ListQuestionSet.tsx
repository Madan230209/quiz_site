import "../../css/ListQuestion.css"
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface IListQuestionSet {
  _id: string;
  title: string;
  questionCount: number;
}

function ListQuestionSet() {
  const [questionSets, setQuestionSet] = useState<IListQuestionSet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const Navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setIsLoading(false);
      return;
    }

    async function fetchData() {
      axios
        .get("http://localhost:3000/api/questions/set/list", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setQuestionSet(response?.data?.questionSet);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }

    fetchData();
  }, []);

  if (isLoading) {
    return <p className="loading-text">Loading...</p>;
  }
  if (questionSets.length === 0)
    return <p className="no-sets-text">No question sets found.</p>;

  return (
    <div className="question-set-container">
      <h2 className="question-set-heading">My Question Sets</h2>
      <ul className="question-set-list">
        {questionSets.map((question) => {
          const TakeQuizHandler = () => {
            Navigate(`/questionset/${question._id}/attempt`);
          };
          return (
            <li key={question._id} className="question-set-item">
              <div className="question-set-info">
                <strong className="question-title">{question.title}</strong>
                <span className="question-count">
                  {question.questionCount} questions
                </span>
              </div>
              <button className="quiz-btn" onClick={TakeQuizHandler}>
                Take Quiz
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ListQuestionSet;
