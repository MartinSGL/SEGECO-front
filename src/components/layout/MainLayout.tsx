import React, { useContext, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, theme } from "antd";
import { AuthContext } from "../../context/AuthContext";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import "./MainLayout.css";
import { MenuRouter } from "../menu/MenuLayout";
import { ChildrenProps } from "../../types";

export const MainLayout = ({ children }: ChildrenProps) => {
  const { user, logOut } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        width="250"
      >
        <div className={collapsed ? "mainlayout-logo2" : "mainlayout-logo"}>
          {collapsed ? "logito" : "logo grande"}
        </div>
        <MenuRouter />
      </Sider>
      <Layout className="mainlayout-site-layout">
        <Header
          style={{
            padding: "0",
            paddingRight: "20px",
            background: colorBgContainer,
            justifyContent: "space-between",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "mainlayout-trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
            Bienvenido:&nbsp;
            <i>
              <strong>{user.fullname}</strong>
            </i>
          </span>
          <Button onClick={logOut}>Cerrar Sesion</Button>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            overflowY: "auto",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
