import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AdminContext } from "../Types/StoresContext";
type UserProviderProps = {
  children: React.ReactNode;
};
export const Requireauth = ({ children }: UserProviderProps) => {
  const { adminToken } = useContext(AdminContext);
  if (!adminToken) {
    return <Navigate to="/faculty/login" />;
  }
  return children;
};
