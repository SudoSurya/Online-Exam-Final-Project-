import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
interface Faculty {
  facultyName: string;
  facultyEmail: string;
}
export default function useFeedback() {
  const [faculty, setFaculty] = useState<Faculty[]>();
  const fetchFaculty = async () => {
    const response: AxiosResponse<Faculty[]> = await axios.get("http://localhost:8088/faculty/approved");
    setFaculty(() =>
      response.data.map((faculty) => ({
        facultyName: faculty.facultyName,
        facultyEmail: faculty.facultyEmail,
      })));
  }
  useEffect(() => {
    fetchFaculty().catch((err) => console.log(err));
  }, []);
  return [faculty];
}
