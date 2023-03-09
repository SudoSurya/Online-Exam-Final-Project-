import React from "react";

const QuizInfo = ({
  subjectID,
  subjectName,
  marks,
  totalDuration,
  totalQuestions,
}) => {
  return (
    <div className="grid grid-cols-1  md:grid-cols-2 gap-4 justify-items-center">
      <div className="bg-white rounded-lg p-8 mb-8">
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
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 self-center">
          Start Exam
        </button>
      </div>
    </div>
  );
};

export default QuizInfo;
