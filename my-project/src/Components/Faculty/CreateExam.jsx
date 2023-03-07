import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Dropzone from "react-dropzone";
import Papa from "papaparse";

const CreateExam = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [csvData, setCsvData] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  console.log(csvData);

  const onSubmit = async (data) => {
    console.log(data);
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      let NewData = { ...data, ...csvData };
      console.log(NewData);
      const response = await axios.post(
        "http://localhost:8088/faculty/add-exam",
        NewData
      );
      console.log(response.data);
      setSubmitting(false);
      setSuccess(true);
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
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto">
      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="subjectID"
        >
          Subject ID:
        </label>
        <input
          type="text"
          id="subjectID"
          className={`form-input ${errors.subjectID ? "border-red-500" : ""}`}
          {...register("subjectID", { required: true })}
        />
        {errors.subjectID && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="subjectName"
        >
          Subject Name:
        </label>
        <input
          type="text"
          id="subjectName"
          className={`form-input ${errors.subjectName ? "border-red-500" : ""}`}
          {...register("subjectName", { required: true })}
        />
        {errors.subjectName && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="Branch">
          Branch:
        </label>
        <input
          type="text"
          id="Branch"
          className={`form-input ${errors.Branch ? "border-red-500" : ""}`}
          {...register("Branch", { required: true })}
        />
        {errors.Branch && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="marks">
          Marks:
        </label>
        <input
          type="number"
          id="marks"
          className={`form-input ${errors.marks ? "border-red-500" : ""}`}
          {...register("marks", { required: true })}
        />
        {errors.marks && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="time">
          Time:
        </label>
        <input
          type="text"
          id="time"
          className={`form-input ${errors.time ? "border-red-500" : ""}`}
          {...register("time", { required: true })}
        />
        {errors.time && (
          <span className="text-red-500">This field is required</span>
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
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      <button
        type="submit"
        disabled={submitting}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default CreateExam;
