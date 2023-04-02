import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminNav from "./AdminNav";
import SingleSubjectResult from "./SingleSubjectResult";

export default function AllSubjectsResults() {
  const { id } = useParams();
  const [results, setResults] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8088/user/result/${id}`)
      .then((res) => setResults(res.data))
      .catch((error) => console.error(error));
  }, [id]);  <SingleSubjectResult results={results} />;

  return (
    <>
      <AdminNav />
      <h1 className="text-center text-4xl m-4 text-slate-600">
        Overall Each Subject Result
      </h1>
      <div className="shadow overflow-x-auto">
        <div className="min-w-screen md:min-w-0 md:w-full inline-block align-middle">
          <div className="overflow-hidden border-b border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Questions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time Taken
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Marks
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Faculty Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Result
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {results.map((result) => {
                  const scorePercentage = (result.score / result.marks) * 100;
                  const passOrFail = scorePercentage >= 35 ? "Pass" : "Fail";
                  return (
                    <tr key={result._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {result.studentID}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {result.SubjectID}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {result.SubjectName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {result.totalQuestions}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {result.duration} sec
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {result.timeTaken} sec
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {result.marks}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {result.score}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {result.facultyName}
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                          passOrFail === "Pass"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {passOrFail}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
