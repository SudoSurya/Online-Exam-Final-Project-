import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
export default function SubjectStats() {
  const [results, setResults] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalPassed, setTotalPassed] = useState(0);
  const [totalFailed, setTotalFailed] = useState(0);
  const [avgScore, setAvgScore] = useState(0);
  const [subjectName, setSubjectName] = useState("");
  const [totalMarks, setTotalMarks] = useState(0);
  const [error, setError] = useState("");
  const [facultyAnalysis, setFacultyAnalysis] = useState("");
  console.log(subjectName);
  const { branch, subjectID, facultyName, subjectName1 } = useParams();
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8088/student/approved")
      .then((response) => {
        const users = response.data;
        const csUsers = users.filter((user) => user.userBranch === branch);
        const csUserCount = csUsers.length;
        setUserCount(csUserCount);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8088/admin/result/${subjectID}/${facultyName}`
        );
        if (response.data.length === 0) {
          setError("No results found.");
          return;
        }
        setResults(response.data);

        let total = 0;
        let passed = 0;
        let failed = 0;
        let scoreSum = 0;
        for (let i = 0; i < response.data.length; i++) {
          const result = response.data[i].Results[0];
          total += 1;
          scoreSum += result.score;
          if ((result.score / result.marks) * 100 >= 35) {
            passed += 1;
          } else {
            failed += 1;
          }
          setSubjectName(result.SubjectName);
          setTotalMarks(result.marks);
        }

        setTotalStudents(total);
        setTotalPassed(passed);
        setTotalFailed(failed);
        setAvgScore((scoreSum / total).toFixed(2));
        if (avgScore <= 5) {
          setFacultyAnalysis("The faculty needs to teach again.");
        } else {
          setFacultyAnalysis("The faculty is doing well.");
        }
      } catch (error) {
        setError("Error fetching results.");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div>
        <h1 className="text-center text-red-400 text-5xl my-10">
          0 Students Attempted Exam
        </h1>
      </div>
    );
  }
  return (
    <section>
      <section className="flex flex-col items-center justify-center h-full mt-28">
        <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 rounded-lg overflow-hidden shadow-lg bg-white">
          <div className="bg-indigo-600 py-4 px-6">
            <h1 className="text-white text-xl font-bold">
              {subjectName1 + " -> Exam Stats"}
            </h1>
          </div>
          <div className="p-6">
            <table className="table-auto w-full border-collapse">
              <tbody>
                <tr>
                  <td className="font-semibold text-gray-700 py-2">
                    Subject ID:
                  </td>
                  <td className="text-gray-600 py-2">{subjectID}</td>
                </tr>
                <tr>
                  <td className="font-semibold text-gray-700 py-2">
                    Total Students:
                  </td>
                  <td className="text-gray-600 py-2">{userCount}</td>
                </tr>
                <tr>
                  <td className="font-semibold text-gray-700 py-2">
                    Students Attempted
                  </td>
                  <td className="text-gray-600 py-2">{totalStudents}</td>
                </tr>
                <tr>
                  <td className="font-semibold text-gray-700 py-2">
                    Passed Students:
                  </td>
                  <td className="text-gray-600 py-2">{totalPassed}</td>
                </tr>
                <tr>
                  <td className="font-semibold text-gray-700 py-2">
                    Failed Students:
                  </td>
                  <td className="text-gray-600 py-2">{totalFailed}</td>
                </tr>
                <tr>
                  <td className="font-semibold text-gray-700 py-2">
                    Total Marks
                  </td>
                  <td className="text-gray-600 py-2">{totalMarks}</td>
                </tr>
                <tr>
                  <td className="font-semibold text-gray-700 py-2">
                    Average Score
                  </td>
                  <td className="text-gray-600 py-2">{avgScore}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      {facultyAnalysis && (
        <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto mt-10 p-10 rounded-lg overflow-hidden shadow-lg bg-white">
          <h1 class="text-4xl font-bold text-green-400">
            {avgScore <= 6
              ? "The faculty needs to teach again."
              : "Students Are Doing Well"}
          </h1>
        </div>
      )}
    </section>
  );
}
