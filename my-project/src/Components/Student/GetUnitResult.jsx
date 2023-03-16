import useUnitResults from "./useUnitResults";

export default function GetUnitResults() {
  const [unitResults, subjectData] = useUnitResults();
  console.log(unitResults);
  console.log(subjectData);
  return (
    <>
      <div>Loading..</div>
    </>
  );
}
