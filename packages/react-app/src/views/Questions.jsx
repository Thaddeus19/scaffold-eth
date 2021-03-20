import React, { useState } from "react";

const DEFAULTS_QUESTIONS = Object.freeze([
  {
    questionText:
      "What is the main problem the creators of this hack are trying to solve?",
    answerOptions: [
      {
        answerText:
          "Content discovery; creator compensation; consumer compensation; removing advertising; subscriptions, and paywall; removing click bait; and promoting healthier discussions online at scale.",
        isCorrect: true,
      },
      {
        answerText:
          "They want to create a question bank like Quora or StackOverflow to test people's knowledge.",
        isCorrect: false,
      },
      {
        answerText:
          "There aren't enough art realted NFT projects, so we'd like to create another.",
        isCorrect: false,
      },
      {
        answerText:
          "They want to create algorithmic, Machine Learning based solutions to recommend better content to users.",
        isCorrect: false,
      },
    ],
  },
  {
    questionText:
      "What is one thing the authors believe is wrong with the current economics behind digital content?",
    answerOptions: [
      {
        answerText:
          "It incentivizes data vamparism and terrible User Interfaces",
        isCorrect: true,
      },
      {
        answerText:
          "Digital economics don't take advantage of blockchain technology.",
        isCorrect: true,
      },
      {
        answerText:
          "Central gatekeepers are responsible for determining what content is noteworthy, important, and worth our viewing, despite not really caring about our overall wellbeing.",
        isCorrect: true,
      },
      {
        answerText:
          "While individual subscriptions and donations are reasonable to ask for as a one-off, these become exhausting as the go to funding mechanism and cause subscription fatigue.",
        isCorrect: false,
      },
    ],
  },
  {
    questionText: "",
    answerOptions: [
      { answerText: "", isCorrect: true },
      { answerText: "", isCorrect: true },
      { answerText: "", isCorrect: true },
      { answerText: "", isCorrect: true },
    ],
  },
]);

export default function Questions({
  questions = DEFAULTS_QUESTIONS,
  handleQuestionsCompleted,
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswerOptionClick = isCorrect => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      handleQuestionsCompleted(score);
    }
  };
  return (
    <div className="questions">
      <div className="question-section">
        <div className="question-count">
          <span>Question {currentQuestion + 1}</span>/{questions.length}
        </div>
        <div className="question-text">
          {questions[currentQuestion].questionText}
        </div>
      </div>
      <div className="answer-section">
        {questions[currentQuestion].answerOptions.map(answerOption => (
          <button
            onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}
          >
            {answerOption.answerText}
          </button>
        ))}
      </div>
    </div>
  );
}
