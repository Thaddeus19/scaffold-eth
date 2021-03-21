import React, { useEffect, useState } from "react";
import Questions from "./Questions";
import { useParams } from "react-router";

export default function Quiz({ smartContract, myaddress }) {
  const { postid } = useParams();
  const [quizzing, setQuizzing] = useState(true);
  const [score, setScore] = useState();

  const grantRewardTo = async address => {
    return smartContract["mintAttentionReward"](address);
  };

  const attentionBalance = async address => {
    return smartContract["balanceOf"](address, 5);
  };

  const fungibleBalance = async address => {
    return smartContract["balanceOf"](address, 6);
  };

  const handleQuestionsCompleted = async score => {
    console.log({ score });
    setScore(score);
    setQuizzing(false);
    for (let i = 0; i < score; i++) {
      // increment by calling smart contract
      // await contract.mintAttentionReward(to = myaddress)
      /* TODO: this granting is naive and insecure - belongs on server */
      await grantRewardTo(myaddress);
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
