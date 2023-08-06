import { Link } from "react-router-dom";
interface CompletedUnitExamProps {
  subjectID: string;
  subjectName: string;
  unit: string;
  marks: number;
  totalDuration: number;
  totalQuestions: number;
}
const CompletedUnitExam = ({
  subjectID,
  subjectName,
  unit,
  marks,
  totalDuration,
  totalQuestions,
}: CompletedUnitExamProps) => {
  console.log(unit);
  const handleViewResult = () => {};
  return (
    <div className="bg-white rounded-lg p-8 mb-8 shadow-md mx-4 w-1/3">
      <h2 className="text-2xl font-bold mb-4">
        {subjectName} {unit}
      </h2>
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
      <button className="bg-red-500  hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 self-center inline-block">
        Exam Completed
      </button>
      <Link
        to={`/student/unit/result/${subjectName}`}
        onClick={handleViewResult}
        className="bg-blue-500 hover:bg-blue-700 mx-6 text-white font-bold py-2 px-4 rounded mt-4 self-center inline-block"
      >
        View Exam Result
      </Link>
    </div>
  );
};

export default CompletedUnitExam;
