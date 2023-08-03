import { createContext, useEffect, useState } from "react";

type userStore = {
  studentToken: string | null;
};
type facultyStore = {
  facultyToken: string | null;
};

type store = {
  adminToken: string | null;
};

export const UserContext = createContext<userStore>({
  studentToken: null,
});

export const FacultyContext = createContext<facultyStore>({
  facultyToken: null,
});

export const AdminContext = createContext<store>({
  adminToken: null,
});
type UserProviderProps = {
  children: React.ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [studentToken, setStudentToken] = useState<string | null>(() => {
    const storedToken = localStorage.getItem("studenttoken");
    return storedToken || null;
  });
  useEffect(() => {
    const storedToken = localStorage.getItem("studenttoken");
    if (storedToken) {
      setStudentToken(storedToken);
    }
  }, []);
  return (
    <UserContext.Provider value={{ studentToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const FacultyProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [facultyToken, setFacultyToken] = useState<string | null>(() => {
    const storedToken = localStorage.getItem("facultytoken");
    return storedToken || null;
  });
  useEffect(() => {
    const storedToken = localStorage.getItem("facultytoken");
    if (storedToken) {
      setFacultyToken(storedToken);
    }
  }, []);
  return (
    <FacultyContext.Provider value={{ facultyToken }}>
      {children}
    </FacultyContext.Provider>
  );
};

export const AdminProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [adminToken, setAdminToken] = useState<string | null>(() => {
    const storedToken = localStorage.getItem("admintoken");
    return storedToken || null;
  });
  useEffect(() => {
    const storedToken = localStorage.getItem("admintoken");
    if (storedToken) {
      setAdminToken(storedToken);
    }
  }, []);
  return (
    <AdminContext.Provider value={{ adminToken }}>
      {children}
    </AdminContext.Provider>
  );
};
