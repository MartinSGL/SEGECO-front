import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb, Button, Layout, theme } from "antd";
import { AuthContext } from "../../context/AuthContext";
import { ChildrenProps } from "../../types";
import "./OperatorLayout.css";

export const regex = /%C3%B1/g;
const { Header, Content, Footer } = Layout;

interface Url {
  path: string;
  name: string;
}

export const OperatorLayout = ({ children }: ChildrenProps) => {
  const { user, logOut } = useContext(AuthContext);
  const { pathname } = useLocation();
  const [urls, setUrls] = useState<Url[]>([]);

  useEffect(() => {
    const initUrls: Url[] = [];
    let path = "";
    pathname
      .substring(1)
      .split("/")
      .map((name) => {
        path = path + "/" + name.replace(regex, "ñ");
        initUrls.push({ path, name: name.replace(regex, "ñ") });
      });
    setUrls(initUrls);
  }, [pathname]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="operator_header_name">
          <span>
            Bienvenido:&nbsp;
            <i>
              <strong>{user.fullname}</strong>
            </i>
          </span>
        </div>
        <Button onClick={logOut}>Cerrar Sesion</Button>
      </Header>
      <Content className="site-layout" style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          {urls.map((url, index) => {
            return (
              <Breadcrumb.Item key={index}>
                {urls.length === index + 1 ? (
                  url.name
                ) : (
                  <Link to={url.path}>{url.name}</Link>
                )}
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
        <div
          className="operator_layout_container"
          style={{ padding: 24, background: colorBgContainer }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        SEGECO @ Roberto Carlos Magaña
      </Footer>
    </Layout>
  );
};
