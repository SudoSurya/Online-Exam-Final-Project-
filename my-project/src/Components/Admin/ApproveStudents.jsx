import AdminNav from "./AdminNav";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
export default function ApproveStudents() {
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8088/student/pending")
      .then((res) => setPendingRequests(res.data))
      .catch((error) => console.log(error));
  }, []);
  const handleApprove = (id) => {
    axios
      .put(`http://localhost:8088/admin/${id}/approve/student`)
      .then((response) => {
        setPendingRequests((prevUsers) =>
          prevUsers.filter((user) => user._id !== id)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleReject = (id) => {
    axios
      .put(`http://localhost:8088/admin/${id}/reject/student`)
      .then((response) => {
        setPendingRequests((prevUsers) =>
          prevUsers.filter((user) => user._id !== id)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const filterRequests =
    pendingRequests.length &&
    pendingRequests.filter((user) => user.status == "PENDING");

  return (
    <section>
      <AdminNav />
      <article>
        <div className="flex flex-col justify-center items-center bg-gray-100 ">
          <h1 className="text-3xl font-bold mb-4 text-center">Pending Users</h1>
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
                  <th className="px-4 py-2 text-gray-700 bg-gray-300">
                    Action
                  </th>
                  <th className="px-4 py-2 text-gray-700 bg-gray-300">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filterRequests.length > 0 ? (
                  filterRequests.map((user, index) => (
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
                      <td className="border px-4 py-2">
                        <button
                          onClick={() => handleApprove(user._id)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                        >
                          Approve
                        </button>
                      </td>
                      <td className="border px-4 py-2">
                        <button
                          onClick={() => handleReject(user._id)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                        >
                          Reject
                        </button>
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
    </section>
  );
}
