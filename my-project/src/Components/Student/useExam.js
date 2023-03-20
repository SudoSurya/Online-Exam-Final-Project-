import { useState, useEffect, useMemo } from "react";
import axios from "axios";

export default function useExam({ id }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subjectID, setSubjectID] = useState(null);
  const [subjectName, setSubjectName] = useState("");
  const [branch, setBranch] = useState("");
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [marks, setMarks] = useState(0);
  const [duration, setDuration] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [facultyName, setFacultyName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8088/user/exam/${id}`
        );
        const {
          subjectID,
          subjectName,
          Branch,
          TotalQuestions,
          marks,
          time,
          facultyName,
          Questions,
        } = response.data;
        setSubjectID(subjectID);
        setSubjectName(subjectName);
        setBranch(Branch);
        setTotalQuestions(TotalQuestions);
        setMarks(marks);
        setDuration(time);
        setFacultyName(facultyName);
        setQuestions(Questions);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const formattedQuestions = useMemo(
    () =>
      questions.map((questionObj) => {
        const { Question, option1, option2, option3, option4, answer } =
          questionObj;

        const answers = [option1, option2, option3, option4];
        const correctAnswerIndex = answers.indexOf(answer);

        return {
          question: Question,
          answers: answers,
          correctAnswerIndex: correctAnswerIndex,
        };
      }),
    [questions]
  );

  function generateRandomQuestions(number) {
    const randomIndices = [];
    while (randomIndices.length < number) {
      const index = Math.floor(Math.random() * formattedQuestions.length);
      if (!randomIndices.includes(index)) {
        randomIndices.push(index);
      }
    }
    const randomObjects = randomIndices.map((i) => formattedQuestions[i]);
    return randomObjects;
  }

  const randomQuestions = useMemo(
    () => generateRandomQuestions(totalQuestions),
    [totalQuestions, formattedQuestions]
  );

  return [
    loading,
    error,
    subjectID,
    subjectName,
    branch,
    totalQuestions,
    marks,
    duration,
    facultyName,
    randomQuestions,
  ];
}
