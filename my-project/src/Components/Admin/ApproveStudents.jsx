import AdminNav from "./AdminNav";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
export default function ApproveStudents() {
  const [pendingRequests, setPendingRequests] = useState([]);
  console.log(pendingRequests);
  useEffect(() => {
    axios
      .get("http://localhost:8088/user-requests")
      .then((res) => setPendingRequests(res.data))
      .catch((error) => console.log(error));
  }, []);
  const handleApprove = (id) => {
    axios
      .put(`http://localhost:8088/admin/${id}/approve`)
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
      .put(`http://localhost:8088/admin/${id}/reject`)
      .then((response) => {
        setPendingRequests((prevUsers) =>
          prevUsers.filter((user) => user._id !== id)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const filterRequests = pendingRequests.filter(
    (user) => user.status == "PENDING"
  );

  return (
    <section>
      <AdminNav />
      <article>
        <div className="flex flex-col justify-center items-center bg-gray-100 h-screen">
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

// ! new

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// function ApproveStudents() {
//   const [users, setUsers] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get("http://localhost:8088/user-requests")
//       .then((response) => {
//         setUsers(response.data);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error(error);
//         setIsLoading(false);
//       });
//   }, []);

//   const handleApprove = (id) => {
//     axios
//       .put(`http://localhost:8088/admin/${id}/approve`)
//       .then((response) => {
//         setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };
//   const filteredUser = users.filter((item) => item.status == "PENDING");

//   const handleReject = (id) => {
//     // axios
//     //   .put(`/api/users/${id}/reject`)
//     //   .then((response) => {
//     //     setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
//     //   })
//     //   .catch((error) => {
//     //     console.error(error);
//     //   });
//   };

//   return (
//     <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//       <h1 className="text-3xl font-bold mb-6">Approve Students</h1>
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : (
//         <>
//           {filteredUser.length > 0 ? (
//             <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//               {filteredUser.map((user) => (
//                 <li
//                   key={user._id}
//                   className="bg-white overflow-hidden shadow rounded-lg"
//                 >
//                   <div className="px-4 py-5 sm:p-6">
//                     <h2 className="text-lg font-bold mb-2">{user.userName}</h2>
//                     <p className="text-gray-600 mb-4">{user.userEmail}</p>
//                     <div className="flex space-x-4">
//                       <button
//                         type="button"
//                         className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//                         onClick={() => handleApprove(user._id)}
//                       >
//                         <FaCheckCircle className="mr-2 h-5 w-5" />
//                         Approve
//                       </button>
//                       <button
//                         type="button"
//                         className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//                         onClick={() => handleReject(user._id)}
//                       >
//                         <FaTimesCircle className="mr-2 h-5 w-5" />
//                         Reject
//                       </button>
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No pending users to approve</p>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// export default ApproveStudents;
