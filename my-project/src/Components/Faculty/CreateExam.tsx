import { useState } from "react";
import { useForm } from "react-hook-form";
import { Questions } from "../../Types/ApiResponses";
import axios from "axios";
import * as Papa from "papaparse";
import {
  AxiosErrorRes,
  AxiosOkRes,
  FormData,
  IExam,
} from "../../Types/FormDataTypes";
import FacultyNav from "./FacultyNav";
import useFaculty from "./useFaculty";

const CreateExam = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const [csvData, setCsvData] = useState<Questions[]>([]);
  console.log(csvData);

  const [error, setError] = useState<string | null>(null);
  const [subjectList] = useFaculty();
  let subjectIDs: string[] | [] = [];
  let subjectNames: string[] | [] = [];
  if (subjectList) {
    subjectIDs = subjectList.map((subject) => subject.subjectID);
    subjectNames = subjectList.map((subject) => subject.subjectName);
  }
  const onSubmit = async (data: FormData) => {
    console.log(data);
    setError(null);

    try {
      const filterData: Questions[] = csvData.filter(
        (item) => item.Question != null
      );
      const NewData: IExam = { ...data, Questions: filterData };
      const response: AxiosOkRes = await axios.post(
        "http://localhost:8088/faculty/add-exam",
        NewData
      );
      alert(response.data.message);
      reset();
    } catch (err: unknown) {
      alert((err as AxiosErrorRes).response?.data.message);
      console.error(err);
      setError("Something went wrong. Please try again later.");
    }
  };

  const handleCsvUpload = (files: FileList | null) => {
    if (!files) return;
    if (files.length === 0) return alert("Please upload a file");
    const file = files[0];

    Papa.parse(file, {
      complete: (result: Papa.ParseResult<Questions>) => {
        if (result.errors.length > 0) {
          console.error("CSV parsing errors:", result.errors);
        } else {
          setCsvData(result.data);
        }
      },
      header: true,
      dynamicTyping: true,
    });
  };

  return (
    <>
      {" "}
      <FacultyNav />
      <div className="flex items-center justify-center py-10 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void handleSubmit(onSubmit)(event);
          }}
          className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-8 mb-4"
        >
          <h2 className="text-2xl font-extrabold text-gray-900 mb-4">
            Add New Exam
          </h2>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <label
                htmlFor="subjectID"
                className="text-gray-800 font-semibold mb-2"
              >
                Subject ID:
              </label>
              <select
                disabled={!subjectIDs.length}
                id="subjectID"
                className="border-2 border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                {...register("subjectID", { required: true })}
              >
                <option value="">Select a Subject</option>
                {subjectIDs.map((id, index) => (
                  <option key={index} value={id}>
                    {id}
                  </option>
                ))}
              </select>
              {!subjectIDs.length && (
                <span className="text-red-600 mt-1">
                  No Subjects are assigned to you
                </span>
              )}

              {errors.subjectID && (
                <span className="text-red-600 mt-1">Subject ID required</span>
              )}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="subjectID"
                className="text-gray-800 font-semibold mb-2"
              >
                Subject Name:
              </label>
              <select
                disabled={!subjectNames.length}
                id="subjectName"
                className="border-2 border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                {...register("subjectName", { required: true })}
              >
                {subjectNames.map((breed, index) => (
                  <option key={index} value={breed}>
                    {breed}
                  </option>
                ))}
              </select>
              {!subjectNames.length && (
                <span className="text-red-600 mt-1">
                  No Subjects are assigned to you
                </span>
              )}

              {errors.subjectName && (
                <span className="text-red-600 mt-1">Subject ID required</span>
              )}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="Branch"
                className="text-gray-800 font-semibold mb-2"
              >
                Branch:
              </label>
              <select
                id="Branch"
                className="border-2 border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                {...register("Branch", { required: true })}
              >
                <option value="">Select a branch</option>
                <option value="Computer Science and Engineering">
                  Computer Science and Engineering
                </option>
                <option value="Electronics and Communication Engineering">
                  Electronics and Communication Engineering
                </option>
                <option value="Mechanical Engineering">
                  Mechanical Engineering
                </option>
                <option value="Civil Engineering">Civil Engineering</option>
              </select>
              {errors.Branch && (
                <span className="text-red-600 mt-1">Branch required</span>
              )}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="TotalQuestions"
                className="text-gray-800 font-semibold mb-2"
              >
                Total Questions:
              </label>
              <input
                type="number"
                id="TotalQuestions"
                className="border-2 border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                {...register("TotalQuestions", { required: true })}
              />
              {errors.TotalQuestions && (
                <span className="text-red-600 mt-1">
                  TotalQuestions Required
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="marks"
                className="text-gray-800 font-semibold mb-2"
              >
                Total Marks:
              </label>
              <input
                type="number"
                id="marks"
                className="border-2 border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                {...register("marks", { required: true })}
              />
              {errors.marks && (
                <span className="text-red-600 mt-1">Marks Required</span>
              )}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="time"
                className="text-gray-800 font-semibold mb-2"
              >
                Exam Duration:
              </label>
              <input
                type="text"
                id="time"
                className="border-2 border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                {...register("time", { required: true })}
              />
              {errors.time && (
                <span className="text-red-600 mt-1">
                  Exam Duration is Required
                </span>
              )}
            </div>

            <div className="hidden">
              <label
                htmlFor="facultyName"
                className="text-gray-800 font-semibold mb-2"
              >
                Exam Duration:
              </label>
              <input
                type="text"
                id="facultyName"
                value={localStorage.getItem("facultyname") as string}
                className="border-2 border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                {...register("facultyName", { required: true })}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="Questions"
              >
                Questions:
              </label>
              <input
                type="file"
                onChange={(e) => handleCsvUpload(e.target.files)}
              />
            </div>

            {error && <div className="text-red-500 mb-4">{error}</div>}
            <div className="mt-8">
              <button
                type="submit"
                className="py-3 px-6 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateExam;
