import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Dropzone from "react-dropzone";
import Papa from "papaparse";
import FacultyNav from "./FacultyNav";
import useFaculty from "./useFaculty";
const CreateExam = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [csvData, setCsvData] = useState([]);
  const [error, setError] = useState(null);

  const [subjectList] = useFaculty();
  console.log(subjectList);
  // console.log(GetFaculty);
  const onSubmit = async (data) => {
    console.log(data);
    setError(null);

    try {
      let filterData = csvData.filter((item) => item.Question != null);
      let NewData = { ...data, Questions: filterData };
      const response = await axios.post(
        "http://localhost:8088/faculty/add-exam",
        NewData
      );
      reset();
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
      setSubmitting(false);
    }
  };

  const handleCsvUpload = (files) => {
    Papa.parse(files[0], {
      complete: (result) => {
        setCsvData(result.data);
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
          onSubmit={handleSubmit(onSubmit)}
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
              <input
                type="text"
                id="subjectID"
                className="border-2 border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                {...register("subjectID", { required: true })}
              />
              {errors.subjectID && (
                <span className="text-red-600 mt-1">Subject ID required</span>
              )}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="subjectName"
                className="text-gray-800 font-semibold mb-2"
              >
                Subject Name:
              </label>
              <input
                type="text"
                id="subjectName"
                className="border-2 border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                {...register("subjectName", { required: true })}
              />
              {errors.subjectName && (
                <span className="text-red-600 mt-1">Subject Name required</span>
              )}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="branch"
                className="text-gray-800 font-semibold mb-2"
              >
                Branch:
              </label>
              <select
                id="branch"
                className="border-2 border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                {...register("branch", { required: true })}
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
              {errors.branch && (
                <span className="text-red-600 mt-1">Branch required</span>
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

            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="Questions"
              >
                Questions:
              </label>
              <Dropzone onDrop={handleCsvUpload}>
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps()}
                    className="border-dashed border-2 border-gray-300 rounded-lg p-8 text-center"
                  >
                    <input {...getInputProps()} />

                    <p className="text-lg text-gray-500">
                      Drag and drop a CSV file, or click to select a file
                    </p>
                  </div>
                )}
              </Dropzone>
              {errors.Questions && (
                <span className="text-red-500"> Question Bank is Required</span>
              )}
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
