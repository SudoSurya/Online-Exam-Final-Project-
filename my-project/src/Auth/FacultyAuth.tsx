import React, { useContext } from "react";
import { FacultyContext } from "../Types/StoresContext";
import { Navigate } from "react-router-dom";
type UserProviderProps = {
  children: React.ReactNode;
};
export const Requireauth = ({ children }: UserProviderProps) => {
  const { facultyToken } = useContext(FacultyContext);
  if (!facultyToken) {
    return <Navigate to="/faculty/login" />;
  }
  return children;
};
