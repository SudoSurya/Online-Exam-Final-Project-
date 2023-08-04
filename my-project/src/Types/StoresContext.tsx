import { createContext, useEffect, useState } from "react";

type userStore = {
  studentToken: string | null;
  login: (studentToken: string) => void;
  logout: () => void;
};
type facultyStore = {
  facultyToken: string | null;
  login: (facultyToken: string) => void;
  logout: () => void;
};

type store = {
  adminToken: string | null;
  login: (adminToken: string) => void;
  logout: () => void;
};

export const UserContext = createContext<userStore>({
  studentToken: null,
  login: (studentToken) => {
    return studentToken;
  },
  logout: () => {
    return;
  },
});

export const FacultyContext = createContext<facultyStore>({
  facultyToken: null,
  login: (facultyToken) => {
    return facultyToken;
  },
  logout: () => {
    return;
  },
});

export const AdminContext = createContext<store>({
  adminToken: null,
  login: (adminToken) => {
    return adminToken;
  },
  logout: () => {
    return;
  },
});
type UserProviderProps = {
  children: React.ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [studentToken, setStudentToken] = useState<string | null>(() => {
    const storedToken = localStorage.getItem("studenttoken");
    return storedToken || null;
  });
  const login = (studentToken: string) => {
    setStudentToken(studentToken);
    localStorage.setItem("studenttoken", studentToken);
  };
  const logout = () => {
    setStudentToken(null);
    localStorage.removeItem("studenttoken");
  };
  useEffect(() => {
    const storedToken = localStorage.getItem("studenttoken");
    if (storedToken) {
      setStudentToken(storedToken);
    }
  }, []);
  return (
    <UserContext.Provider value={{ studentToken, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const FacultyProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [facultyToken, setFacultyToken] = useState<string | null>(() => {
    const storedToken = localStorage.getItem("facultytoken");
    return storedToken || null;
  });
  const login = (facultyToken: string) => {
    setFacultyToken(facultyToken);
    localStorage.setItem("facultytoken", facultyToken);
  };
  const logout = () => {
    setFacultyToken(null);
    localStorage.removeItem("facultytoken");
  };
  useEffect(() => {
    const storedToken = localStorage.getItem("facultytoken");
    if (storedToken) {
      setFacultyToken(storedToken);
    }
  }, []);
  return (
    <FacultyContext.Provider value={{ facultyToken, login, logout }}>
      {children}
    </FacultyContext.Provider>
  );
};

export const AdminProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [adminToken, setAdminToken] = useState<string | null>(() => {
    const storedToken = localStorage.getItem("admintoken");
    return storedToken || null;
  });
  const login = (adminToken: string) => {
    setAdminToken(adminToken);
    localStorage.setItem("admintoken", adminToken);
  };
  const logout = () => {
    setAdminToken(null);
    localStorage.removeItem("admintoken");
  };
  useEffect(() => {
    const storedToken = localStorage.getItem("admintoken");
    if (storedToken) {
      setAdminToken(storedToken);
    }
  }, []);
  return (
    <AdminContext.Provider value={{ adminToken, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};
