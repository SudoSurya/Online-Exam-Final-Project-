import { useState, useEffect } from "react";
import AdminNav from "./AdminNav";
import SubjectForm from "./SubjectForm";
export interface IFacultyList {
  _id: string;
  facultyName: string;
  facultyEmail: string;
  facultyNumber: number;
  Subjects: Subject[];
}
interface Subject {
  _id: string;
  SubjectName: string;
  SubjectID: string;
}
function FacultyList() {
  const [faculty, setFaculty] = useState<IFacultyList[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<IFacultyList>();
  console.log(faculty);
  useEffect(() => {
    fetch("http://localhost:8088/faculty/approved")
      .then((response) => response.json())
      .then((data: IFacultyList[]) => setFaculty(data))
      .catch((err) => console.log(err));
  }, []);

  const handleAddSubject = (faculty: IFacultyList) => {
    setSelectedFaculty(faculty);
    setShowModal(true);
  };

  return (
    <>
      <AdminNav />
      <div className="max-w-4xl mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Faculty Members</h2>
        <ul className="space-y-4">
          {faculty.map((member) => (
            <li
              key={member._id}
              className="border border-gray-300 p-4 rounded-md"
            >
              <h3 className="text-lg font-semibold">{member.facultyName}</h3>
              <p className="text-gray-600">
                Faculty Number: {member.facultyNumber}
              </p>
              <p className="text-gray-600">Email: {member.facultyEmail}</p>
              {member.Subjects.map((item) => (
                <div
                  key={item._id}
                  className="border border-gray-300 p-4 rounded-md my-2"
                >
                  <h3 className="text-lg font-semibold">Subject Details</h3>
                  <p className="text-gray-600">Subject ID: {item.SubjectID}</p>
                  <p className="text-gray-600">
                    Subject Name: {item.SubjectName}
                  </p>
                </div>
              ))}
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-2"
                onClick={() => handleAddSubject(member)}
              >
                Add Subject
              </button>
            </li>
          ))}
        </ul>
        {showModal && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                {selectedFaculty && (
                  <SubjectForm
                    setShowModal={setShowModal}
                    selectedFaculty={selectedFaculty}
                    setFaculty={setFaculty}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default FacultyList;
