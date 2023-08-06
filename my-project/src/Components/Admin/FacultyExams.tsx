import AdminNav from "./AdminNav";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ExamInfo from "./ExamInfo";
import useFeedback from "../Student/useFeedback";
interface ICounductedExams {
  _id: string;
  subjectID: string;
  subjectName: string;
  marks: number;
  time: number;
  TotalQuestions: number;
  facultyName: string;
  Branch: string;
}
export interface FacultyFormData {
  facultyName: string;
}
export default function FacultyExams() {
  const [conductedExams, setConductedExams] = useState<ICounductedExams[]>([]);
  const [error, setError] = useState("");
  const [faculty] = useFeedback();
  console.log(conductedExams);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FacultyFormData>();
  const onSubmit = (data: FacultyFormData) => {
    setError("");
    axios
      .get(`http://localhost:8088/admin/exams/${data.facultyName}`)
      .then((response: AxiosResponse<ICounductedExams[]>) => {
        setConductedExams(response.data);
        setError(`"No Exams Conducted by"${data.facultyName}`);
      })
      .catch(() => {
        setError("No Exams Conducted by this faculty");
      });
  };
  return (
    <>
      <AdminNav />
      <div className="flex flex-col justify-center items-center my-10 ">
        <div className="bg-white shadow-md rounded-lg w-full max-w-2xl">
          <div className="py-4 px-8">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(onSubmit)(e);
              }}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="faculty"
                  className="block text-gray-800 font-bold mb-2"
                >
                  Faculty
                </label>
                <select
                  id="facultyName"
                  {...register("facultyName", { required: true })}
                  className={`border border-gray-400 rounded w-full py-2 px-3 ${
                    errors.facultyName ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Select a faculty member</option>
                  {faculty &&
                    faculty.map((option, index) => (
                      <option key={index} value={option.facultyName}>
                        {option.facultyName}
                      </option>
                    ))}
                </select>
                {errors.facultyName && (
                  <p className="text-red-500 mt-2">Faculty name is required</p>
                )}
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow"
                >
                  Get Conducted Exams
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-semibold my-10 text-center">
        {conductedExams.length ? " Conducted Exams" : ""}
      </h1>
      <div className="flex justify-center m-10">
        {conductedExams.length ? (
          conductedExams.map((item) => {
            return (
              <ExamInfo
                key={item._id}
                subjectID={item.subjectID}
                subjectName={item.subjectName}
                marks={item.marks}
                totalDuration={item.time}
                totalQuestions={item.TotalQuestions}
                facultyName={item.facultyName}
                branch={item.Branch}
              />
            );
          })
        ) : (
          <div>{error}</div>
        )}
      </div>
    </>
  );
}
