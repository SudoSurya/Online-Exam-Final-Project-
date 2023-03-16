import { useState, useEffect } from "react";
import StudentNav from "./StudentNav";
import axios from "axios";
import { useForm } from "react-hook-form";
import GetUnitExams from "./GetUnitExams";
import UnitResults from "./UnitResults";
export default function GetUnitResult() {
  const [studentID] = useState(localStorage.getItem("studentid"));
  const [studentbranch] = useState(localStorage.getItem("studentbranch"));
  const [subjects, setSubjects] = useState();
  const [results, setResults] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  useEffect(() => {
    axios
      .get(`http://localhost:8088/user/unit/exams/${studentbranch}/subjects`)
      .then((res) => setSubjects(res.data));
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await axios
        .get(
          `http://localhost:8088/user/unit/result/${studentID}/${data.subjectName}`
        )
        .then((res) => setResults(res.data));
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <StudentNav />
      <div className="flex flex-col justify-center items-center m-4">
        <div className="bg-white shadow-md rounded-lg w-full max-w-2xl">
          <div className="py-4 px-8">
            <div className="mb-4">
              <h2 className="text-center text-3xl font-bold text-gray-800">
                Get Unit Result
              </h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label
                  htmlFor="subjectName"
                  className="block text-gray-800 font-bold mb-2"
                >
                  subjects
                </label>
                <select
                  id="subjectName"
                  {...register("subjectName", { required: true })}
                  className={`border border-gray-400 rounded w-full py-2 px-3 ${
                    errors.faculty ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Select a Subject Name</option>
                  {subjects &&
                    subjects.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                </select>
                {errors.subjectName && (
                  <p className="text-red-500 mt-2">subject name is required</p>
                )}
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow"
                >
                  Get Unit Results
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {results && <UnitResults results={results} />}
    </>
  );
}
