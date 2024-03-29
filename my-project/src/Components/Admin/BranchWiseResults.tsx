import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import AdminNav from "./AdminNav";
import { Student } from "./ApproveStudents";
import TestTable from "./TestTable";
import { UserData } from "../../Types/ResultTypes";
export default function BranchWiseResults() {
  const [users, setUsers] = useState<Student[]>([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [result, setResult] = useState<UserData[]>([]);

  useEffect(() => {
    fetch("http://localhost:8088/student/approved")
      .then((response) => response.json())
      .then((data: Student[]) => setUsers(data))
      .catch((error) => console.error(error));
  }, []);

  const branches = Array.from(new Set(users.map((user) => user.userBranch)));

  const fetchResults = async (selectedBranch: string) => {
    try {
      const response: AxiosResponse<UserData[]> = await axios.get(
        `http://localhost:8088/results/${selectedBranch}`
      );
      setResult(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (selectedBranch !== "") {
      fetchResults(selectedBranch).catch((error) => console.log(error));
    } else {
      setResult([]);
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
        </div>
      </div>
      {result.length > 0 ? (
        <TestTable data={result} />
      ) : (
        <h1 className="text-center text-red-500">No Result Found</h1>
      )}
    </>
  );
}
