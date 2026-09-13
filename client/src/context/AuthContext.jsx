import { createContext, useContext, useState } from "react";
import API from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("lifeRPGUser")) || null
  );

  const register = async (username, email, password) => {
    const response = await API.post("/auth/register", {
      username,
      email,
      password,
    });

    localStorage.setItem(
      "lifeRPGToken",
      response.data.token
    );

    localStorage.setItem(
      "lifeRPGUser",
      JSON.stringify(response.data.user)
    );

    setUser(response.data.user);

    return response.data;
  };

  const login = async (email, password) => {
    const response = await API.post("/auth/login", {
      email,
      password,
    });

    localStorage.setItem(
      "lifeRPGToken",
      response.data.token
    );

    localStorage.setItem(
      "lifeRPGUser",
      JSON.stringify(response.data.user)
    );

    setUser(response.data.user);

    return response.data;
  };

  const logout = () => {
    localStorage.removeItem("lifeRPGToken");
    localStorage.removeItem("lifeRPGUser");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};