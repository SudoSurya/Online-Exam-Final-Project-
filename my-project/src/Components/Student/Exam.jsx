import { useParams } from "react-router-dom";
import useExam from "./useExam";
import React, { useState, useEffect, useRef } from "react";
export default function Exam() {
  const { id } = useParams();
  const [
    loading,
    error,
    subjectID,
    subjectName,
    branch,
    totalQuestions,
    marks,
    duration,
    randomQuestions,
  ] = useExam({ id });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(duration * 60);

  useEffect(() => {
    setTimeRemaining(duration * 60);
  }, [duration]);

  const intervalIdRef = useRef(null);
  console.log(timeRemaining);
  useEffect(() => {
    intervalIdRef.current = setInterval(() => {
      setTimeRemaining((timeRemaining) => timeRemaining - 1);
    }, 1000);

    return () => clearInterval(intervalIdRef.current);
  }, []);

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setUserAnswers({ ...userAnswers, [questionIndex]: answerIndex });
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const calculateScore = () => {
    const score = Object.entries(userAnswers).reduce(
      (totalScore, [questionIndex, answerIndex]) => {
        const correctAnswerIndex =
          randomQuestions[questionIndex].correctAnswerIndex;
        return totalScore + (answerIndex === correctAnswerIndex ? 1 : 0);
      },
      0
    );
    return score;
  };

  if (timeRemaining <= 0 || currentQuestionIndex >= randomQuestions.length) {
    const score = calculateScore();
    return (
      <div className="quiz-container">
        <h1>Your score is: {score}</h1>
      </div>
    );
  }

  const currentQuestion = randomQuestions[currentQuestionIndex];

  return (
    <>
      <div className="flex justify-between items-center mb-4 bg-blue-500 p-4 rounded-lg shadow-md">
        <div className="text-white font-medium text-lg w-1/4">
          Subject: Maths
        </div>
        <div className="text-white font-medium text-lg w-1/4">Time: 10 min</div>
        <div className="text-white font-medium text-lg w-1/4">
          Total Questions: 10
        </div>
        <div className="text-white font-medium text-lg w-1/4">
          Subject ID: 19070
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-gray-900 font-bold text-2xl mb-4">
          Time remaining: {timeRemaining}
        </h1>
        <div className="text-gray-900 text-lg font-medium mb-4">
          {currentQuestion.question}
        </div>
        {currentQuestion.answers.map((answer, index) => (
          <div className="mb-2" key={index}>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name={`question${currentQuestionIndex}`}
                value={index}
                onChange={() => handleAnswerSelect(currentQuestionIndex, index)}
                checked={userAnswers[currentQuestionIndex] === index}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-900 text-lg font-medium">
                {answer}
              </span>
            </label>
          </div>
        ))}
        <div className="flex justify-between mt-6">
          <button
            className={`bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded ${
              currentQuestionIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>
          <button
            className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow ${
              userAnswers[currentQuestionIndex] === undefined
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={handleNextQuestion}
            disabled={userAnswers[currentQuestionIndex] === undefined}
          >
            {currentQuestionIndex === randomQuestions.length - 1
              ? "Submit"
              : "next"}
          </button>
        </div>
      </div>
    </>
  );
}
