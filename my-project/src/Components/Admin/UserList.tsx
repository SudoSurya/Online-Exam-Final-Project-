import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import AdminNav from "./AdminNav";
import { Tuserdata } from "../../Types/UserTypes";
import { IResult } from "../../Types/ResultTypes";
import SingleSubjectResult from "./SingleSubjectResult";
export default function UserList() {
  const [users, setUsers] = useState<Tuserdata[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [result, setResult] = useState<IResult[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  console.log(result);

  useEffect(() => {
    fetch("http://localhost:8088/student/approved")
      .then((response) => response.json())
      .then((data: Tuserdata[]) => setUsers(data))
      .catch((error) => {
        console.error(error);
        setErrorMsg("");
      });
  }, []);

  const branches = Array.from(new Set(users.map((user) => user.userBranch)));

  const userIds = users
    .filter((user) => user.userBranch === selectedBranch)
    .map((user) => user.userID);

  const handleButtonClick = async () => {
    if (selectedSubject === "all") {
      await axios
        .get(`http://localhost:8088/${selectedUserId}/${selectedBranch}/all`)
        .then((res: AxiosResponse<IResult[]>) => setResult(res.data));
    } else {
      await axios
        .get(
          `http://localhost:8088/${selectedUserId}/${selectedBranch}/${selectedSubject}`
        )
        .then((res: AxiosResponse<IResult[]>) => setResult(res.data));
    }
  };

  const fetchSubjects = async () => {
    try {
      const response: AxiosResponse<string[]> = await axios.get(
        `http://localhost:8088/user/exams/${selectedBranch}/subjects`
      );
      setSubjects(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedBranch !== "") {
      fetchSubjects().catch((error) => console.log(error));
    } else {
      setSubjects([]);
    }
  }, [selectedBranch]);

  return (
    <>
      <AdminNav />
      <div className="border border-slate-300 rounded-lg m-4 p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <label
              htmlFor="branch-select"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Branch:
            </label>
            <select
              id="branch-select"
              value={selectedBranch}
              onChange={(event) => setSelectedBranch(event.target.value)}
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select a branch</option>
              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label
              htmlFor="user-select"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              User:
            </label>
            <select
              id="user-select"
              value={selectedUserId}
              onChange={(event) => setSelectedUserId(event.target.value)}
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              disabled={!selectedBranch}
            >
              <option value="">Select a user</option>
              {userIds.map((userId) => (
                <option key={userId} value={userId}>
                  {userId}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label
              htmlFor="subject-select"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Subject:
            </label>
            <select
              id="subject-select"
              value={selectedSubject}
              onChange={(event) => setSelectedSubject(event.target.value)}
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              disabled={!selectedBranch}
            >
              <option value="">Select a subject</option>
              <option value="all">All Subjects</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={handleButtonClick}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Get Result
          </button>
        </div>
      </div>
      {result.length > 0 ? (
        <SingleSubjectResult results={result} />
      ) : (
        <h1 className="text-center text-red-500">{errorMsg}</h1>
      )}
    </>
  );
}
