import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import AdminNav from "./AdminNav";
interface Student {
  _id: string;
  userID: string;
  userName: string;
  userBranch: string;
  status: string;
}
export default function ViewStudents() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8088/student/approved")
      .then((res: AxiosResponse<Student[]>) => setStudents(res.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <AdminNav />
      <article>
        <div className="flex flex-col justify-center items-center bg-gray-100 ">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Approved Users
          </h1>
          <div className="w-full max-w-3xl">
            <table className="table-auto w-full border shadow-md">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-gray-700 bg-gray-300">#</th>
                  <th className="px-4 py-2 text-gray-700 bg-gray-300">Name</th>
                  <th className="px-4 py-2 text-gray-700 bg-gray-300">Email</th>
                  <th className="px-4 py-2 text-gray-700 bg-gray-300">
                    Branch
                  </th>
                  <th className="px-4 py-2 text-gray-700 bg-gray-300">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.length > 0 ? (
                  students.map((user, index) => (
                    <tr key={user._id}>
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">{user.userID}</td>
                      <td className="border px-4 py-2">{user.userName}</td>
                      <td className="border px-4 py-2">{user.userBranch}</td>
                      <td className="border px-4 py-2">
                        {user.status == "PENDING" ? (
                          <span className="text-orange-500 font-bold">
                            <FaExclamationCircle className="inline mr-1" />
                            Pending
                          </span>
                        ) : (
                          <span className="text-green-500 font-bold">
                            <FaCheckCircle className="inline mr-1" />
                            Approved
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="text-center">No pending users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </article>
    </>
  );
}
