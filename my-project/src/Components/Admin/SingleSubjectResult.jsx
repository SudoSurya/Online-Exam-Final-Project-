export default function SingleSubjectResult({ results }) {
  return (
    <div className="shadow overflow-x-auto">
      <div className="min-w-screen md:min-w-0 md:w-full inline-block align-middle">
        <div className="overflow-hidden border-b border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Questions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time Taken
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Marks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Faculty Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Result
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.map((result) => {
                const scorePercentage =
                  (result.Results[0].score / result.Results[0].marks) * 100;
                const passOrFail = scorePercentage >= 35 ? "Pass" : "Fail";
                return (
                  <tr key={result._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {result.Results[0].studentID}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {result.Results[0].SubjectID}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {result.Results[0].SubjectName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {result.Results[0].totalQuestions}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {result.Results[0].duration} sec
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {result.Results[0].timeTaken} sec
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {result.Results[0].marks}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {result.Results[0].score}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {result.Results[0].facultyName}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                        passOrFail === "Pass"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {passOrFail}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
