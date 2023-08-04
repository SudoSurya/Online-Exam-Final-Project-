import { useState, useEffect, useMemo } from "react";
import axios, { AxiosResponse } from "axios";
import { AxiosErrorRes } from "../../Types/FormDataTypes";
export interface ExamResponse {
  _id: string;
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
type Questions = {
  Question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: string;
}

export default function useUnitExam(id: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [subjectID, setSubjectID] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [unit, setUnit] = useState("");
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
          `http://localhost:8088/user/unit/exam/${id}`
        );
        const {
          subjectID,
          subjectName,
          unit,
          Branch,
          TotalQuestions,
          marks,
          time,
          facultyName,
          Questions,
        }: ExamResponse = response.data;
        setSubjectID(subjectID);
        setSubjectName(subjectName);
        setUnit(unit);
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

    fetchData().catch((error: AxiosErrorRes) => {
      setError(error.message);
      setLoading(false);
    })
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
    unit,
    branch,
    totalQuestions,
    marks,
    duration,
    facultyName,
    randomQuestions,
  ];
}
