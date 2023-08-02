import { useState, useEffect } from "react";
import axios from "axios";

export default function useUnitResults() {
  const studentID = localStorage.getItem("studentid");
  const [unitResults, setUnitResults] = useState<any[]>([]);
  const [subjectData, setSubjectData] = useState<any>([]);

  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:8088/user/unit/result/${studentID}`
    );
    setUnitResults(response.data);
  };

  useEffect(() => {
    fetchData();
  }, [studentID]);

  useEffect(() => {
    setSubjectData(unitResults.map(({ SubjectID, unit }) => [SubjectID, unit]));
  }, [unitResults]);

  return [unitResults, subjectData];
}
