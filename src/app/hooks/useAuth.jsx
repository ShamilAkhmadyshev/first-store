import axios from "axios";
import React, { useContext, useState } from "react";
import userService from "../service/userService";
import { setTokens } from "../service/localStorageService";

const httpAuth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/",
  params: { key: process.env.REACT_APP_FIREBASE_KEY },
});
const AuthContext = React.createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  async function logIn({ email, password }) {
    const url = `accounts:signInWithPassword`;
    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true,
      });
      setTokens(data);
    } catch (error) {
      const { code, message } = error.response.data.error;
      console.log(code, message);
      if (code === 400) {
        if (message.includes("INVALID")) {
          const errorObject = {
            email: "Check if your login and password are correct",
          };
          throw errorObject;
        } else if (message.includes("TOO_MANY_ATTEMPTS_TRY_LATER")) {
          const errorObject = {
            email: "Too many attempts. Try again later",
          };
          throw errorObject;
        } else {
          const errorObject = {
            email: "Something went wrong",
          };
          throw errorObject;
        }
      }
    }
  }

  async function signUp({ email, password }) {
    const url = `accounts:signUp`;
    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true,
      });
      setTokens(data);
      createUser({ _id: data.localId, email, password });
    } catch (error) {
      console.log(error);
    }
  }

  const createUser = async (data) => {
    try {
      const { content } = userService.create(data);
      setUser(content);
    } catch (error) {
      Promise.reject(error);
    }
  };

  return (
    <AuthContext.Provider value={{ signUp, logIn, createUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
