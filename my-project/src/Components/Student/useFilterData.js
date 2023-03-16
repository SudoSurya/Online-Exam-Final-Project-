import { useEffect, useState } from "react";

export default function useFilterData({ exams, subjectData }) {
  const [filteredData, setFilteredData] = useState([]);

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
  }, [exams, subjectData]);

  return filteredData;
}
