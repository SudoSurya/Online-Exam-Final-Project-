import React from "react";
import { Link } from "react-router-dom";
const ExamInfo = ({
  examID,
  subjectID,
  subjectName,
  marks,
  totalDuration,
  totalQuestions,
  facultyName,
  branch,
}) => {
  return (
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
        <div className="flex justify-between mb-4">
          <p className="font-bold">Total questions:</p>
          <p>{totalQuestions}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-bold">Conducted By:</p>
          <p>{facultyName}</p>
        </div>
      </div>
      <Link
        to={`/stats/${branch}/${subjectID}/${facultyName}`}
        className="bg-green-500  hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 self-center inline-block"
      >
        View Stats
      </Link>
      <Link
        to={`/exam/result/${subjectID}/${facultyName}`}
        className="bg-blue-500 hover:bg-blue-700 mx-6 text-white font-bold py-2 px-4 rounded mt-4 self-center inline-block"
      >
        View Exam Results
      </Link>
    </div>
  );
};

export default ExamInfo;
