import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ApiSegeco } from "../api/ApiSegeco";
import { getToken } from "../helpers/getToken";
import {
  ContextProps,
  Credentials,
  UserInformation,
} from "./AuthContext.interfaces";
import axios, { AxiosError } from "axios";
import { ChildrenProps } from "../types";

export const initialUser: UserInformation = {
  fullname: "",
  user: "",
  role: "",
};

export const AuthContext = createContext({} as ContextProps);

export const AuthProvider = ({ children }: ChildrenProps) => {
  const [user, setUser] = useState<UserInformation>(initialUser);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingContext, setIsLoadingContext] = useState(true);
  const [errorServer, setServerError] = useState<null | AxiosError>(null);

  const navigate: (url: string) => void = useNavigate();
  // check if token exists in local storage
  useEffect(() => {
    //helper
    getToken({ setUser, navigate });
    setIsLoadingContext(false);
  }, []);

  const logIn = async (credentials: Credentials) => {
    try {
      setServerError(null);
      //active the loader
      setIsLoading(true);
      const res = await ApiSegeco.post("users/login", credentials);
      //decode payload token
      const payload: UserInformation = jwtDecode(res.data.token);
      //set global user payload
      setUser(payload);
      //set the global user to the local storage
      localStorage.setItem("token", res.data.token);
      if (payload.role === "admin" || payload.role === "super") {
        navigate("/home");
        setIsLoading(false);
      } else {
        navigate("/empresas");
        setIsLoading(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios network error
        setServerError(error);
        setIsLoading(false);
      }
      console.log(error);
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setUser(initialUser);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logOut,
        logIn,
        isLoading,
        errorServer,
        isLoadingContext,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
