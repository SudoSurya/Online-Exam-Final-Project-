import StudentNav from "./StudentNav";
import UnitTestInfo from "./UnitTestInfo";
import useUnitResults from "./useUnitResults";
import useFilterData from "./useFilterData";
import CompletedUnitExam from "./CompletedUnitExam";
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
      <h1 className="text-4xl underline underline-offset-4 font-semibold text-center my-10">
        Pending Exams
      </h1>
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
      <h1 className="text-4xl underline underline-offset-4 font-semibold text-center my-10">
        Completed Exams
      </h1>
      <div className="flex flex-wrap justify-center m-10">
        {CompletedExams.length > 0 &&
          CompletedExams.map((item) => {
            return (
              <CompletedUnitExam
                key={item._id}
                examID={item._id}
                subjectID={item.subjectID}
                subjectName={item.subjectName}
                unit={item.unit}
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
