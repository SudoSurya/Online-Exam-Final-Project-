import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ResultsTable() {
  const { subjectID, facultyName } = useParams();
  const [results, setResults] = useState([]);
  const [sortType, setSortType] = useState(null);
  const [sortByStudentID, setSortByStudentID] = useState(false);
  const [filterOption, setFilterOption] = useState(null);

  const filteredResults = results.filter((result) => {
    const passPercentage =
      (result.Results[0].score / result.Results[0].marks) * 100;
    const failPercentage = 100 - passPercentage;

    if (filterOption === "pass") {
      return passPercentage >= 35;
    } else if (filterOption === "fail") {
      return failPercentage >= 35;
    } else {
      return true;
    }
  });

  const sortedResults = filteredResults.sort((result1, result2) => {
    if (sortType === "ranking") {
      const score1 = result1.Results[0].score;
      const time1 = result1.Results[0].timeTaken;
      const score2 = result2.Results[0].score;
      const time2 = result2.Results[0].timeTaken;
      const ranking1 = score1 / time1;
      const ranking2 = score2 / time2;
      return ranking2 - ranking1;
    } else if (sortType === "studentID") {
      const studentID1 = result1.Results[0].studentID;
      const studentID2 = result2.Results[0].studentID;
      return sortByStudentID
        ? studentID2.localeCompare(studentID1)
        : studentID1.localeCompare(studentID2);
    }
    return 0;
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8088/admin/result/${subjectID}/${facultyName}`)
      .then((response) => {
        setResults(response.data);
      });
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col m-4 md:flex-row space-y-2 md:space-y-0 md:space-x-4 border rounded-md border-gray-300 p-4">
          <h1 className="text-3xl font-bold mb-4">Results</h1>
          <div className="flex-grow">
            <label
              htmlFor="filter"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Filter by:
            </label>
            <select
              id="filter"
              name="filter"
              className="w-full rounded border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
            >
              <option value="all">All</option>
              <option value="pass">Pass (35% or more)</option>
              <option value="fail">Fail (less than 35%)</option>
            </select>
          </div>
          <div className="flex-grow">
            <label
              htmlFor="sortSelect"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Sort by:
            </label>
            <select
              id="sortSelect"
              name="sortSelect"
              className="w-full rounded border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="ranking">Ranking</option>
              <option value="studentID">Student ID</option>
            </select>
            {sortType === "studentID" && (
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    className="rounded border-gray-300 text-indigo-500 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    type="checkbox"
                    checked={sortByStudentID}
                    onChange={() => setSortByStudentID(!sortByStudentID)}
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    Descending
                  </span>
                </label>
              </div>
            )}
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full table-auto border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2">Rank</th>
                <th className="px-4 py-2">Student ID</th>
                <th className="px-4 py-2">Subject ID</th>
                <th className="px-4 py-2">Subject Name</th>
                <th className="px-4 py-2">Total Questions</th>
                <th className="px-4 py-2">Duration</th>
                <th className="px-4 py-2">Time Taken</th>
                <th className="px-4 py-2">Score</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((result, index) => (
                <tr key={result._id}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">
                    {result.Results[0].studentID}
                  </td>
                  <td className="border px-4 py-2">
                    {result.Results[0].SubjectID}
                  </td>
                  <td className="border px-4 py-2">
                    {result.Results[0].SubjectName}
                  </td>
                  <td className="border px-4 py-2">
                    {result.Results[0].totalQuestions}
                  </td>
                  <td className="border px-4 py-2">
                    {result.Results[0].duration} seconds
                  </td>
                  <td className="border px-4 py-2">
                    {result.Results[0].timeTaken} seconds
                  </td>
                  <td className="border px-4 py-2">
                    {result.Results[0].score}
                  </td>
                  <td
                    className={
                      result.Results[0].score / result.Results[0].marks >= 0.35
                        ? "text-green-500 border px-4 py-2"
                        : "text-red-500 border px-4 py-2"
                    }
                  >
                    {result.Results[0].score / result.Results[0].marks >= 0.35
                      ? "Passed"
                      : "Failed"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
