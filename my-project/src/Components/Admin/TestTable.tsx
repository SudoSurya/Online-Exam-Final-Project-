import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SResult, UserData } from "../../Types/ResultTypes";
interface TestTableProps {
  data: UserData[];
}

const TestTable: React.FC<TestTableProps> = ({ data }) => {
  const [sortedData, setSortedData] = useState<UserData[]>([]);
  console.log("data", sortedData);

  const [sortBy, setSortBy] = useState("studentId");

  useEffect(() => {
    if (sortBy === "avgScore") {
      // sort by average score
      const sortedByScore = [...data].sort((a, b) => {
        const aScore = getAverageScore(a.Results);
        const bScore = getAverageScore(b.Results);
        return bScore - aScore;
      });
      setSortedData(sortedByScore);
    } else if (sortBy === "passFail") {
      // sort by pass/fail
      const sortedByPassFail = [...data].sort((a, b) => {
        const aPassFail = Number(
          checkFailedSubjects(a.Results).hasFailedSubject
        );
        const bPassFail = Number(
          checkFailedSubjects(b.Results).hasFailedSubject
        );
        return aPassFail - bPassFail;
      });
      setSortedData(sortedByPassFail);
    } else if (sortBy === "studentId") {
      // sort by student ID
      const sortedByStudentId = [...data].sort((a, b) => {
        return a.userID.localeCompare(b.userID);
      });
      setSortedData(sortedByStudentId);
      return;
    }
  }, [data, sortBy]);

  const getAverageScore = (results: SResult[]) => {
    const totalScore = results.reduce((acc, result) => {
      return acc + result.score;
    }, 0);
    return totalScore / results.length;
  };

  const checkFailedSubjects = (results: SResult[]) => {
    let hasFailedSubject = false;
    const resultsWithFailures = results.map((result) => {
      const percentage = (result.score / result.marks) * 100;
      if (percentage < 35) {
        hasFailedSubject = true;
        result.isFailed = true;
      } else {
        result.isFailed = false;
      }
      return result;
    });
    return { hasFailedSubject, resultsWithFailures };
  };

  const renderTableRows = () => {
    return sortedData.map((student, index) => {
      const { hasFailedSubject, resultsWithFailures } = checkFailedSubjects(
        student.Results
      );
      const averageScore = getAverageScore(resultsWithFailures);
      return (
        <tr key={student.userID}>
          <td className="px-4 py-2 border">{index + 1}</td>
          <td className="px-4 py-2 border">{student.userID}</td>
          <td className="px-4 py-2 border">{student.userName}</td>
          <td className="px-4 py-2 border">{student.userEmail}</td>
          <td className="px-4 py-2 border">{student.userBranch}</td>
          <td className="px-4 py-2 border">{resultsWithFailures.length}</td>
          <td
            className={`px-4 py-2 border whitespace-nowrap text-sm font-medium ${
              hasFailedSubject ? "text-red-500" : "text-green-500"
            }`}
          >
            {hasFailedSubject ? "Fail" : "Pass"}
          </td>
          <td className="px-4 py-2 border">{averageScore.toFixed(2)}</td>
          <td className="px-4 py-2 border">
            <Link
              to={`/${student.userID}/allsubjects`}
              target="_blank"
              className="bg-green-500  hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 self-center inline-block"
            >
              View Subjects
            </Link>
          </td>
        </tr>
      );
    });
  };

  return (
    <div>
      <div className="flex justify-center">
        <button
          onClick={() => setSortBy("studentId")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Sort by Student ID
        </button>
        <button
          onClick={() => setSortBy("avgScore")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Sort by Average Score
        </button>
        <button
          onClick={() => setSortBy("passFail")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sort by Pass/Fail
        </button>
      </div>
      <table className="mx-auto my-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">Rank</th>
            <th className="px-4 py-2">Student ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Branch</th>
            <th className="px-4 py-2">Total Exams Written</th>
            <th className="px-4 py-2">Result</th>
            <th className="px-4 py-2">Average Score</th>
            <th className="px-4 py-2">View SubjectWise </th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
    </div>
  );
};

export default TestTable;
