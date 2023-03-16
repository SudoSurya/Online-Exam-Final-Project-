import { useState, useEffect } from "react";
import axios from "axios";
import StudentNav from "./StudentNav";
import CompletedExamInfo from "./CompletedExamInfo";
import UnitTestInfo from "./UnitTestInfo";
import useUnitResults from "./useUnitResults";
import useFilterData from "./useFilterData";
export default function GetUnitExams({ exams }) {
  const [unitResults, subjectData] = useUnitResults();
  const [CompletedExams, PendingExams] = useFilterData({ exams, subjectData });

  if (exams.length < 1) {
    return (
      <>
        <StudentNav />
        <div>Loading...</div>;
      </>
    );
  }
  return (
    <>
      <h1 className="text-2xl font-semibold center my-10">Pending Exams</h1>
      <div className="flex justify-center flex-wrap m-10">
        {PendingExams.length > 0 ? (
          PendingExams.map((item) => (
            <UnitTestInfo
              key={item._id}
              examID={item._id}
              subjectID={item.subjectID}
              subjectName={item.subjectName}
              unit={item.unit}
              marks={item.marks}
              totalDuration={item.time}
              totalQuestions={item.TotalQuestions}
            />
          ))
        ) : (
          <div>No Pending Exams</div>
        )}
      </div>
      <h1 className="text-2xl font-semibold my-10">Completed Exams</h1>
      <div className="flex justify-center m-10">
        {CompletedExams.length > 0 &&
          CompletedExams.map((item) => {
            return (
              <CompletedExamInfo
                key={item._id}
                examID={item._id}
                subjectID={item.subjectID}
                subjectName={item.subjectName}
                marks={item.marks}
                totalDuration={item.time}
                totalQuestions={item.TotalQuestions}
              />
            );
          })}
      </div>
    </>
  );
}
