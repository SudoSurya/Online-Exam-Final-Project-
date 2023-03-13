import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useResults() {
  const [results, setResults] = useState([]);
  const [studentID] = useState(localStorage.getItem("studentid"));
  const [subjectIDS, setSubjectIDS] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:8088/user/result/${studentID}`
      );
      setResults(response.data);
      setSubjectIDS(response.data.map((obj) => obj.SubjectID));
    };
    fetchData();
  }, []);
  return [results, subjectIDS];
}
