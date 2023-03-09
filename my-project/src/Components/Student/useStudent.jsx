import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { userStore } from "../../App";

export default function useStudent() {
  const [studentToken, setStudentToken] = useContext(userStore);
  const [student, setStudent] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:8088/user/dashboard", {
        headers: {
          "x-token": studentToken,
        },
      })
      .then((res) => {
        setStudent(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return [student];
}
