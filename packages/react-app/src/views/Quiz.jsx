import React, { useState } from "react";
import Questions from "./Questions";

export default function Quiz({ questions }) {
  const [quizzing, setQuizzing] = useState(true);
  const [score, setScore] = useState();

  const handleQuestionsCompleted = score => {
    setScore(score);
    setQuizzing(false);
  };
  return (
    <div>
      {quizzing && (
        <Questions
          questions={questions}
          handleQuestionsCompleted={handleQuestionsCompleted}
        />
      )}
      {score && <div>You answered {score} questions correctly.</div>}
    </div>
  );
}
