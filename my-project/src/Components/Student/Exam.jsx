import { useParams } from "react-router-dom";
import useExam from "./useExam";
export default function Exam() {
  const { id } = useParams();
  const [
    loading,
    error,
    subjectID,
    subjectName,
    branch,
    totalQuestions,
    marks,
    duration,
    formattedQuestions,
  ] = useExam({ id });
  console.log(formattedQuestions);
  if (loading) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <h1>{subjectID}</h1>
      <h1>{subjectName}</h1>
      <h1>{branch}</h1>
      <h1>{totalQuestions}</h1>
      <h1>{marks}</h1>
      <h1>{duration}</h1>
    </div>
  );
}
