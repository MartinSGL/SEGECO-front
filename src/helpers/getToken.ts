import { jwtDecode } from "jwt-decode";
import {
  ContextProps,
  UserInformation,
} from "../context/AuthContext.interfaces";

interface Params {
  setUser: ContextProps["setUser"];
  navigate: (url: string) => void;
}

export const getToken = async ({ setUser, navigate }: Params) => {
  try {
    const tokenStorage = localStorage.getItem("token");
    if (tokenStorage) {
      //get the header
      jwtDecode(tokenStorage, {
        header: true,
      });
      //get the payload
      const payload: UserInformation = jwtDecode(tokenStorage);
      setUser(payload);
    }
  } catch (error) {
    navigate("/");
    localStorage.removeItem("token");
  }
};
