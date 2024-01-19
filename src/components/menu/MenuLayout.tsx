import { useContext, useRef } from "react";
import { Menu } from "antd";
import {
  UserOutlined,
  UnorderedListOutlined,
  ReadOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const MenuRouter = () => {
  const {user} = useContext(AuthContext)
  const navigate: (url: string) => void = useNavigate();

  //get the path name of url to active the right item menu
  const { pathname } = useLocation();
  const pathnameFirstLine = useRef(pathname).current.split("/")[1];

  return user.role === "admin" || user.role === "super" ? (
    <Menu
      defaultSelectedKeys={[pathnameFirstLine]}
      items={[
        {
          key: "home",
          icon: <UnorderedListOutlined />,
          label: "Servicios",
          onClick: () => navigate("/request"),
        },
        {
          key: "Usuarios",
          icon: <UserOutlined />,
          label: "Employees",
          onClick: () => navigate(`/employees`),
        },
        {
          key: "Empresas",
          icon: <UsergroupAddOutlined />,
          label: "Project Responsibles",
          onClick: () => navigate("/project_responsibles"),
        },
        {
          key: "Equipos",
          icon: <ReadOutlined />,
          label: "History",
          onClick: () => navigate("/history"),
        },
      ]}
      style={{ border: "none" }}
    />
  ) : (
    <Menu
      defaultSelectedKeys={[pathnameFirstLine]}
      items={[
        {
          key: "Compañias",
          icon: <UnorderedListOutlined />,
          label: "Compañias",
          onClick: () => navigate("/employeeinfo"),
        },
      ]}
      style={{ border: "none" }}
    />
  );
};
