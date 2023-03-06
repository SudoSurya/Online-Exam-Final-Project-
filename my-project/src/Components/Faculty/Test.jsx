import React, { useState } from "react";
import Dropzone from "react-dropzone";
import Papa from "papaparse";
import axios from "axios";
import { csvToJson } from "./utils";

function Test() {
  const [csvData, setCsvData] = useState([]);
  const [jsonOutput, setJsonOutput] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(csvData);
  
  const handleCsvUpload = (files) => {
    const reader = new FileReader();

    reader.onload = () => {
      const csvData = reader.result;
      const jsonData = csvToJson(csvData);
      setJsonOutput(jsonData);
      setCsvData(csvData);
    };

    reader.readAsText(files[0]);
  };

  async function postDataToMongoDB() {
    setLoading(true);

    try {
      // Convert CSV data to JSON
      const json = await csvToJson(csvData);

      console.log("JSON:", json);

      // Check data format
      if (!Array.isArray(json)) {
        console.error("Invalid data format");
        setLoading(false);
        return;
      }

      // Send data to server
      const response = await axios.post(
        "http://localhost:8088/api/csv-to-json",
        { data: json },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Response:", response);

      setJsonOutput(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  }

  const fetchDataFromMongoDB = async () => {
    setLoading(true);

    try {
      const response = await axios.get("http://localhost:8088/api/fetch-data");
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
