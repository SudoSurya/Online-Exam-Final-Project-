import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AdminNav from "./AdminNav";

export default function ResultsTable() {
  const { subjectID, facultyName } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8088/admin/result/${subjectID}/${facultyName}`)
      .then((response) => {
        setResults(response.data);
      });
  }, []);
  // Sort the results based on the ranking criteria
  const sortedResults = results.sort((a, b) => {
    if (a.Results[0].score !== b.Results[0].score) {
      return b.Results[0].score - a.Results[0].score;
    } else if (a.Results[0].timeTaken !== b.Results[0].timeTaken) {
      return a.Results[0].timeTaken - b.Results[0].timeTaken;
    } else {
      return b.Results[0].marks - a.Results[0].marks;
    }
  });

  return (
    <>
      <AdminNav />{" "}
      <div className="w-full overflow-x-auto my-4">
        <h1 className="text-3xl font-bold mb-4">Results</h1>
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
              <th className="px-4 py-2">Faculty Name</th>
            </tr>
          </thead>
          <tbody>
            {sortedResults.map((result, index) => (
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
                <td className="border px-4 py-2">{result.Results[0].score}</td>
                <td className="border px-4 py-2">
                  {result.Results[0].facultyName}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
