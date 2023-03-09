// import React, { useState } from "react";
// import Dropzone from "react-dropzone";
// import Papa from "papaparse";
// import axios from "axios";

// function Test() {
//   const [csvData, setCsvData] = useState([]);
//   const [jsonOutput, setJsonOutput] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleCsvUpload = (files) => {
//     setLoading(true);

//     Papa.parse(files[0], {
//       complete: (result) => {
//         setCsvData(result.data);
//         setLoading(false);
//       },
//       header: true,
//       dynamicTyping: true,
//     });
//   };

//   const postDataToMongoDB = () => {
//     setLoading(true);

//     try {
//       let filterData = csvData.filter((item) => item.name != null);
//       axios.post("http://localhost:8088/api/csv-to-mongo", filterData);
//       console.log("new", csvData);
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const fetchDataFromMongoDB = async () => {
//     setLoading(true);

//     try {
//       const response = await axios.get("http://localhost:8088/api/fetch-data");
//       console.log("output", response.data[0].name);
//       setJsonOutput(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
//         <h1 className="text-3xl font-bold mb-8">CSV to MongoDB Example</h1>

//         <Dropzone onDrop={handleCsvUpload}>
//           {({ getRootProps, getInputProps }) => (
//             <div
//               {...getRootProps()}
//               className="border-dashed border-2 border-gray-300 rounded-lg p-8 text-center"
//             >
//               <input {...getInputProps()} />
//               <p className="text-lg text-gray-500">
//                 Drag and drop a CSV file, or click to select a file
//               </p>
//             </div>
//           )}
//         </Dropzone>

//         <div className="mt-8">
//           <button
//             onClick={postDataToMongoDB}
//             disabled={!csvData.length || loading}
//             className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-4"
//           >
//             Upload to MongoDB
//           </button>

//           <button
//             onClick={fetchDataFromMongoDB}
//             disabled={loading}
//             className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
//           >
//             Fetch data from MongoDB
//           </button>

//           {loading && <p className="text-gray-500 mt-4">Loading...</p>}

//           {jsonOutput.length > 0 && (
//             <div className="mt-8">
//               <h2 className="text-2xl font-bold mb-4">JSON Output</h2>
//               <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
//                 {JSON.stringify(jsonOutput, null, 2)}
//               </pre>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useForm } from "react-hook-form";
import axios from "axios";

function Test({ facultyId }) {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();


  const onSubmit = async (data) => {
    try {
      const response = await axios.patch(`/add-subject/faculty/${facultyId}`, {
        Questions: [data.subject],
      });
      console.log(response.data);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="subject"
          >
            Subject
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="subject"
            type="text"
            placeholder="Enter subject"
            {...register("subject", { required: true })}
          />
          {errors.subject && (
            <p className="text-red-500 text-xs italic">Subject is required.</p>
          )}
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Subject
        </button>
      </div>
    </form>
  );
}
export default Test;
