import React, { useState } from "react";
import Questions from "./Questions";
import { useParams } from "react-router";
import { juicyDetails } from "../data";

export default function Quiz() {
  const { postid } = useParams();
  const [quizzing, setQuizzing] = useState(true);
  const [score, setScore] = useState();

  const handleQuestionsCompleted = async score => {
    setScore(score);
    setQuizzing(false);
    for (let i = 0; i < score; i++) {
      // increment by calling smart contract
      // await contract.mintAttentionReward(to = myaddress)
    }
  };
  return (
    <div>
      Post Id: {postid}
      {quizzing && (
        <Questions
          quizId={postid}
          handleQuestionsCompleted={handleQuestionsCompleted}
        />
      )}
      {score && <div>You answered {score} questions correctly.</div>}
    </div>
  );
}
