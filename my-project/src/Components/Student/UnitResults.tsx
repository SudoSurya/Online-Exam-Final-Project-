interface UnitResultsProps {
  results: Result[];
}

interface Result {
  _id: string;
  SubjectID: string;
  SubjectName: string;
  unit: string;
  totalQuestions: number;
  duration: number;
  timeTaken: number;
  score: number;
}

const UnitResults = ({ results }: UnitResultsProps) => {
  if (!results.length) {
    return (
      <>
        <h1 className="text-center text-red-500 text-5xl my-16">
          Result Not Found
        </h1>
      </>
    );
  }

  const totalScore = results.reduce((acc, result) => acc + result.score, 0);
  const avgScore = totalScore / results.length;

  return (
    <>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">
          {results.length > 0 && results[0].SubjectName} Unit Exam Results
        </h1>
        <table className="w-full table-auto border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">Subject ID</th>
              <th className="px-4 py-2">unit</th>
              <th className="px-4 py-2">Total Questions</th>
              <th className="px-4 py-2">Duration</th>
              <th className="px-4 py-2">Time Taken</th>
              <th className="px-4 py-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result._id}>
                <td className="border px-4 py-2">{result.SubjectID}</td>
                <td className="border px-4 py-2">{result.unit}</td>
                <td className="border px-4 py-2">{result.totalQuestions}</td>
                <td className="border px-4 py-2">
                  {result.duration / 60} Minutes
                </td>
                <td className="border px-4 py-2">
                  {(result.timeTaken / 60).toFixed(2)} Minutes
                </td>
                <td className="border px-4 py-2">{result.score}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={5} className="border px-4 py-2 font-bold">
                Average Score:
              </td>
              <td className="border px-4 py-2 font-bold">
                {avgScore.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UnitResults;
