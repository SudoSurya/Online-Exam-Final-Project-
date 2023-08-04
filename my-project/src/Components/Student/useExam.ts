import { useState, useEffect, useMemo } from "react";
import axios, { AxiosResponse } from "axios";
import { Questions } from "../../Types/ApiResponses";
import { AxiosErrorRes } from "../../Types/FormDataTypes";

interface ExamResponse {
  subjectID: string;
  subjectName: string;
  unit: string;
  Branch: string;
  TotalQuestions: number;
  marks: number;
  time: number;
  facultyName: string;
  Questions: Questions[];
}
export default function useExam(id: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [subjectID, setSubjectID] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [branch, setBranch] = useState("");
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [marks, setMarks] = useState(0);
  const [duration, setDuration] = useState(0);
  const [questions, setQuestions] = useState<Questions[]>([]);
  const [facultyName, setFacultyName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<ExamResponse> = await axios.get(
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
      } catch (error: unknown) {
        setError((error as AxiosErrorRes).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData().catch((err) => console.log(err));
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

  function generateRandomQuestions(number: number) {
    const randomIndices: number[] = [];
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
