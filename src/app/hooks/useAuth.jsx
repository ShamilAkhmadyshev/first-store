import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import userService from "../service/userService";
import localStorageService, { setTokens } from "../service/localStorageService";

const httpAuth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/",
  params: { key: process.env.REACT_APP_FIREBASE_KEY },
});
const AuthContext = React.createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    console.log(user);
  }, [user]);

  async function logIn({ email, password }) {
    const url = `accounts:signInWithPassword`;
    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true,
      });
      setTokens(data);
      await getUserData();
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
      // const content = await userService.getCurrentUser();
      // setUser({ _id: data.localId, email, password, cart: ["test"] });
    } catch (error) {
      const { code, message } = error.response.data.error;
      if (code === 400) {
        if (message === "EMAIL_EXISTS") {
          const errorObject = {
            email: "User with that email already exists",
          };
          throw errorObject;
        }
      }
    }
  }

  const createUser = async (data) => {
    try {
      const content = await userService.create(data);
      console.log(content);
      setUser(content);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   console.log(user);
  // }, []);

  async function getUserData() {
    try {
      if (localStorage.getItem("jwt-token")) {
        // const { content } = await userService.getCurrentUser();
        const content = await userService.getCurrentUser();
        setUser(content);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function logout() {
    localStorageService.removeAuthData();
    setUser(null);
  }

  async function updateUser(data) {
    try {
      const content = await userService.update(data);
      console.log("upd user", content);
      setUser(content);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("jwt-token")) {
      getUserData();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ signUp, updateUser, logIn, createUser, user, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
