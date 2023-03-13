import { useEffect, useState } from "react";
export default function useFeedback() {
  const [faculty, setFaculty] = useState();
  useEffect(() => {
    fetch("http://localhost:8088/faculty/approved")
      .then((response) => response.json())
      .then((data) =>
        setFaculty(() =>
          data.map((faculty) => ({
            facultyName: faculty.facultyName,
            facultyEmail: faculty.facultyEmail,
          }))
        )
      );
  }, []);
  return [faculty];
}
