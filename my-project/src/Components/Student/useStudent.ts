import axios, { AxiosResponse } from "axios";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../Types/StoresContext";
import { Tuserdata } from "../../Types/UserTypes";

export default function useStudent() {
  const {studentToken} = useContext(UserContext);
  const [student, setStudent] = useState<Tuserdata>();
  useEffect(() => {
    axios
      .get("http://localhost:8088/user/dashboard", {
        headers: {
          "x-token": studentToken,
        },
      })
      .then((res:AxiosResponse<Tuserdata>) => {
        setStudent(res.data);
        localStorage.setItem("studentbranch", res.data.userBranch);
        localStorage.setItem("studentid", res.data.userID);
      })
      .catch((err) => console.log(err));
  }, []);
  return [student];
}
