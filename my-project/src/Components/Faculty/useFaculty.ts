import axios, { AxiosResponse } from "axios";
import { useState, useContext, useEffect } from "react";
import { FacultyContext } from "../../Types/StoresContext";
import { TFaculty, TSubjectList } from "../../Types/ApiResponses";

export default function useFaculty() {
  const [faculty, setFaculty] = useState<TFaculty>();
  const { facultyToken } = useContext(FacultyContext);
  const [subjectList, setSubjectList] = useState<TSubjectList[]>();

  useEffect(() => {
    axios
      .get("http://localhost:8088/faculty/dashboard", {
        headers: {
          "x-token": facultyToken,
        },
      })
      .then((res: AxiosResponse<TFaculty>) => {
        setFaculty(res.data);
        localStorage.setItem("facultyname", res.data.facultyName);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (faculty) {
      getFacultySubjects(faculty._id)
        .then((subjects) => setSubjectList(subjects))
        .catch((err) => console.error(err));
    }
  }, [faculty]);

  const getFacultySubjects = async (facultyId: string): Promise<TSubjectList[]> => {
    try {
      const response: AxiosResponse<{ subjectList: TSubjectList[] }> = await axios.get(
        `http://localhost:8088/admin/${facultyId}/subjects`
      );
      return response?.data.subjectList;
    } catch (err) {
      console.error(err);
      throw new Error("Failed to fetch faculty subjects");
    }
  };

  return [subjectList];
}
