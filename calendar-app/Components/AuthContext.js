import React, { createContext, useState, useEffect } from "react";
import { getIsLoggedIn } from "./Storage/userDataStorage";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await getIsLoggedIn();
      setIsRegistered(loggedIn);
    };
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isRegistered, setIsRegistered }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
