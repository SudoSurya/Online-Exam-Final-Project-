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

// import { useForm } from "react-hook-form";
// import axios from "axios";

// function Test({ facultyId }) {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       const response = await axios.patch(`/add-subject/faculty/${facultyId}`, {
//         Questions: [data.subject],
//       });
//       console.log(response.data);
//       reset();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
//       <div className="flex flex-wrap -mx-3 mb-6">
//         <div className="w-full px-3 mb-6 md:mb-0">
//           <label
//             className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//             htmlFor="subject"
//           >
//             Subject
//           </label>
//           <input
//             className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
//             id="subject"
//             type="text"
//             placeholder="Enter subject"
//             {...register("subject", { required: true })}
//           />
//           {errors.subject && (
//             <p className="text-red-500 text-xs italic">Subject is required.</p>
//           )}
//         </div>
//       </div>
//       <div className="flex justify-end">
//         <button
//           type="submit"
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//         >
//           Add Subject
//         </button>
//       </div>
//     </form>
//   );
// }
// export default Test;

import "../../App.css";
import React, { useState, useEffect, useRef } from "react";

const firstData = [
  {
    Question: "What is the derivative of x^2?",
    option1: "2x",
    option2: "x^2",
    option3: "1",
    option4: "0",
    answer: "2x",
    _id: "640a108a9be1f7c9a6f82997",
  },
  {
    Question: "What is the capital of France?",
    option1: "Berlin",
    option2: "Paris",
    option3: "London",
    option4: "Rome",
    answer: "Paris",
    _id: "640a108a9be1f7c9a6f82998",
  },
  {
    Question: "What is the boiling point of water?",
    option1: "50°C",
    option2: "100°C",
    option3: "0°C",
    option4: "-100°C",
    answer: "100°C",
    _id: "640a108a9be1f7c9a6f82999",
  },
  {
    Question: 'Who wrote the novel "Pride and Prejudice"?',
    option1:
      "CCharles DickensCharles DickensCharles ickensCharles DickensCharles DickeickensCharles DickensCharles DickeickensCharles DickensCharles DickeickensCharles DickensCharles DickeickensCharles DickensCharles DickeickensCharles DickensCharles DickeickensCharles DickensCharles DickeickensCharles DickensCharles DickeickensCharles DickensCharles DickeickensCharles DickensCharles DickeickensCharles DickensCharles DickeickensCharles DickensCharles DickeickensCharles DickensCharles DickeickensCharles DickensCharles DickeickensCharles DickensCharles DickeickensCharles DickensCharles DickeickensCharles DickensCharles DickeickensCharles DickensCharles DickeickensCharles DickensCharles DickeickensCharles DickensCharles Dicke DickensCharles DickensCharles DickensCharles Dickensharles Dickens",
    option2: "Emily Bronte",
    option3:
      "Charlotte Bronte  Who wrote the novelWho wrote the novelWho wrote the novelWho wrote the novelWho wrote the novelWho wrote the novelWho wrote the novelWho wrote the novelWho wrote the novelWho wrote the novelWho wrote the novelWho wrote the novelWho wrote the novelWho wrote the novel",
    option4: "Jane Austen",
    answer: "Jane Austen",
    _id: "640a108a9be1f7c9a6f8299a",
  },
];
const secondData = firstData.map((questionObj) => {
  const { Question, option1, option2, option3, option4, answer } = questionObj;

  const answers = [option1, option2, option3, option4];
  const correctAnswerIndex = answers.indexOf(answer);

  return {
    question: Question,
    answers: answers,
    correctAnswerIndex: correctAnswerIndex,
  };
});

function Test() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(100);

  const intervalIdRef = useRef(null);

  useEffect(() => {
    intervalIdRef.current = setInterval(() => {
      setTimeRemaining((timeRemaining) => timeRemaining - 1);
    }, 1000);

    return () => clearInterval(intervalIdRef.current);
  }, []);

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setUserAnswers({ ...userAnswers, [questionIndex]: answerIndex });
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const calculateScore = () => {
    const score = Object.entries(userAnswers).reduce(
      (totalScore, [questionIndex, answerIndex]) => {
        const correctAnswerIndex = secondData[questionIndex].correctAnswerIndex;
        return totalScore + (answerIndex === correctAnswerIndex ? 1 : 0);
      },
      0
    );
    return score;
  };

  if (timeRemaining <= 0 || currentQuestionIndex >= secondData.length) {
    const score = calculateScore();
    return (
      <div className="quiz-container">
        <h1>Your score is: {score}</h1>
      </div>
    );
  }

  const currentQuestion = secondData[currentQuestionIndex];
  console.log(currentQuestion);

  return (
    <>
      <div className="flex justify-between items-center mb-4 bg-blue-500 p-4 rounded-lg shadow-md">
        <div className="text-white font-medium text-lg w-1/4">
          Subject: Maths
        </div>
        <div className="text-white font-medium text-lg w-1/4">Time: 10 min</div>
        <div className="text-white font-medium text-lg w-1/4">
          Total Questions: 10
        </div>
        <div className="text-white font-medium text-lg w-1/4">
          Subject ID: 19070
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-gray-900 font-bold text-2xl mb-4">
          Time remaining: {timeRemaining}
        </h1>
        <div className="text-gray-900 text-lg font-medium mb-4">
          {currentQuestion.question}
        </div>
        {currentQuestion.answers.map((answer, index) => (
          <div className="mb-2" key={index}>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name={`question${currentQuestionIndex}`}
                value={index}
                onChange={() => handleAnswerSelect(currentQuestionIndex, index)}
                checked={userAnswers[currentQuestionIndex] === index}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-900 text-lg font-medium">
                {answer}
              </span>
            </label>
          </div>
        ))}
        <div className="flex justify-between mt-6">
          <button
            className={`bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded ${
              currentQuestionIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>
          <button
            className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow ${
              userAnswers[currentQuestionIndex] === undefined
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={handleNextQuestion}
            disabled={userAnswers[currentQuestionIndex] === undefined}
          >
            {currentQuestionIndex === secondData.length - 1 ? "Submit" : "next"}
          </button>
        </div>
      </div>
    </>
  );
}

export default Test;
