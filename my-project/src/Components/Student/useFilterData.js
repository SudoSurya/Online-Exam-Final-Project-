import { useEffect, useState } from "react";

export default function useFilterData({ exams, subjectData }) {
  const [CompletedExams, setFilteredData] = useState([]);
  const [PendingExams, setPending] = useState([]);
  useEffect(() => {
    setFilteredData(
      exams.filter((obj) => {
        for (let i = 0; i < subjectData.length; i++) {
          if (
            obj.subjectID === subjectData[i][0] &&
            obj.unit === subjectData[i][1]
          ) {
            return true;
          }
        }
        return false;
      })
    );
    setPending(
      exams.filter((obj) => {
        for (let i = 0; i < subjectData.length; i++) {
          if (
            obj.subjectID === subjectData[i][0] &&
            obj.unit === subjectData[i][1]
          ) {
            return false;
          }
        }
        return true;
      })
    );
  }, [exams, subjectData]);

  return [CompletedExams, PendingExams];
}
