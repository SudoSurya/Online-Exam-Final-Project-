import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { IResult } from "../../Types/ResultTypes";

export default function useResults() {
  const [results, setResults] = useState<IResult[]>([]);
  const [studentID] = useState(localStorage.getItem("studentid"));
  const [subjectIDS, setSubjectIDS] = useState<string[]>();
  useEffect(() => {
    const fetchData = async () => {
      const response: AxiosResponse<IResult[]> = await axios.get(
        `http://localhost:8088/user/result/${studentID}`
      );
      setResults(response.data);
      setSubjectIDS(response.data.map((obj) => obj.SubjectID));
    };
    fetchData().catch((err) => console.log(err));
  }, []);
  return [results, subjectIDS];
}
