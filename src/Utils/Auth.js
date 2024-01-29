import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  const login = () => {
    try {
      console.log("logging in...");
      const userString = localStorage.getItem("user");
      console.log("userstring", userString);
      if (!userString) return;

      let userObject = {};
      userObject = jwtDecode(userString);
      if (!userObject) return;

      userObject.token = userString;
      setUser(userObject);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setUser(null);
  };

  useEffect(() => {
    // Check for user in local storage during component initialization
    const userString = localStorage.getItem("user");
    if (userString) {
      let userObject = jwtDecode(userString);
      if (userObject) {
        userObject.token = userString;
        setUser(userObject);
      }
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <AuthContext.Provider value={{ user: user, login: login, logout: logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
