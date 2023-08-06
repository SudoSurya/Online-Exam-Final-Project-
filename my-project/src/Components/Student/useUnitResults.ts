import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { UnitExamResult } from "./UnitResult";
export type TSubjectData = [string, string][];

export default function useUnitResults() {
  const studentID = localStorage.getItem("studentid");
  const [unitResults, setUnitResults] = useState<UnitExamResult[]>([]);
  const [subjectData, setSubjectData] = useState<TSubjectData>([]);

  const fetchData = async () => {
    const response: AxiosResponse<UnitExamResult[]> = await axios.get(
      `http://localhost:8088/user/unit/result/${studentID}`
    );
    setUnitResults(response.data);
  };

  useEffect(() => {
    fetchData().catch((err) => console.log(err));
  }, [studentID]);

  useEffect(() => {
    setSubjectData(unitResults.map(({ SubjectID, unit }) => [SubjectID, unit]));
  }, [unitResults]);

  return { unitResults, subjectData };
}
