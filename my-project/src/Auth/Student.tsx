import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Types/StoresContext";
type UserProviderProps = {
  children: React.ReactNode;
};
export const RequireStudentAuth= ({ children }: UserProviderProps) => {
  const { studentToken } = useContext(UserContext);
  if (!studentToken) {
    return <Navigate to="/faculty/login" />;
  }
  return children;
};
