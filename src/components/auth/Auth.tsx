import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "../layout/MainLayout";
import { AuthContext } from "../../context/AuthContext";
import { UserInformation } from "../../context/AuthContext.interfaces";
import { OperatorLayout } from "../layout";

type Props = {
  children: JSX.Element;
};

export const Auth = ({ children }: Props) => {
  const navigate: (url: string) => void = useNavigate();
  const { user } = useContext(AuthContext);
  const [auth, setAuth] = useState<UserInformation | null>(null);

  useEffect(() => {
    setAuth(user);
    if (auth) {
      if (user.fullname === "" || user.role === '') {
        navigate('/');
      }
    }
  }, [auth, navigate, user]);

  if (user.fullname === "" || user.role === "") return null;
  if (user.role === "operator") return <OperatorLayout>{children}</OperatorLayout>;
  return <MainLayout>{children}</MainLayout>;
};
