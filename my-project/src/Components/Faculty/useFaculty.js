import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { facultyStore } from "../../App";

export default function useFaculty() {
  const [faculty, setFaculty] = useState();
  const [facultyToken, setFacultyToken] = useContext(facultyStore);
  const [subjectList, setSubjectList] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8088/faculty/dashboard", {
        headers: {
          "x-token": facultyToken,
        },
      })
      .then((res) => {
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

  const getFacultySubjects = async (facultyId) => {
    try {
      const response = await axios.get(
        `http://localhost:8088/admin/${facultyId}/subjects`
      );
      return response.data.subjectList;
    } catch (err) {
      console.error(err);
      throw new Error("Failed to fetch faculty subjects");
    }
  };

  return [subjectList];
}
