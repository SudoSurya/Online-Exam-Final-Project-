import React, { useState } from "react";
import Dropzone from "react-dropzone";
import Papa from "papaparse";
import axios from "axios";

function Test() {
  const [csvData, setCsvData] = useState([]);
  const [jsonOutput, setJsonOutput] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCsvUpload = (files) => {
    setLoading(true);

    Papa.parse(files[0], {
      complete: (result) => {
        setCsvData(result.data);
        setLoading(false);
      },
      header: true,
      dynamicTyping: true,
    });
  };

  const postDataToMongoDB = () => {
    setLoading(true);

    try {
      let filterData = csvData.filter((item) => item.name != null);
      axios.post("http://localhost:8088/api/csv-to-mongo", filterData);
      console.log("new", csvData);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDataFromMongoDB = async () => {
    setLoading(true);

    try {
      const response = await axios.get("http://localhost:8088/api/fetch-data");
      console.log("output", response.data[0].name);
      setJsonOutput(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">CSV to MongoDB Example</h1>

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

        <div className="mt-8">
          <button
            onClick={postDataToMongoDB}
            disabled={!csvData.length || loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-4"
          >
            Upload to MongoDB
          </button>

          <button
            onClick={fetchDataFromMongoDB}
            disabled={loading}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
          >
            Fetch data from MongoDB
          </button>

          {loading && <p className="text-gray-500 mt-4">Loading...</p>}

          {jsonOutput.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">JSON Output</h2>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
                {JSON.stringify(jsonOutput, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Test;
