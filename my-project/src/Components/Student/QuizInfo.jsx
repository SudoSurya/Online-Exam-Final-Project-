import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
const QuizInfo = ({
  examID,
  subjectID,
  subjectName,
  marks,
  totalDuration,
  totalQuestions,
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const handleFullScreen = () => {
    const element = document.documentElement; // get the root element of the document
    if (!isFullScreen) {
      element.requestFullscreen(); // request full screen mode
      setIsFullScreen(true); // update the state variable
    }
  };

  return (
    // <div className="flex flex-wrap justify-center">
    <div className="bg-white rounded-lg p-8 mb-8 shadow-md mx-4 w-1/3">
      <h2 className="text-2xl font-bold mb-4">{subjectName}</h2>
      <div className="flex flex-col">
        <div className="flex justify-between mb-4">
          <p className="font-bold">Subject ID:</p>
          <p>{subjectID}</p>
        </div>
        <div className="flex justify-between mb-4">
          <p className="font-bold">Total marks:</p>
          <p>{marks}</p>
        </div>
        <div className="flex justify-between mb-4">
          <p className="font-bold">Total duration:</p>
          <p>{totalDuration} mins</p>
        </div>
        <div className="flex justify-between">
          <p className="font-bold">Total questions:</p>
          <p>{totalQuestions}</p>
        </div>
      </div>
      <Link
        to={`/student/exam/${examID}`}
        onClick={handleFullScreen}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 self-center inline-block"
      >
        Start Exam
      </Link>
    </div>
    // </div>
  );
};

export default QuizInfo;
