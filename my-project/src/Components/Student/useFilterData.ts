import { useEffect, useState } from "react";
import { ExamResponse } from "./useUnitExam";
import { TSubjectData } from "./useUnitResults";

interface ExamResponseT {
  exams: ExamResponse[];
  subjectData: TSubjectData
}


export default function useFilterData({ exams, subjectData }: ExamResponseT) {
  const [CompletedExams, setFilteredData] = useState<ExamResponse[]>([]);
  const [PendingExams, setPending] = useState<ExamResponse[]>([]);
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

  return { CompletedExams, PendingExams }
}
