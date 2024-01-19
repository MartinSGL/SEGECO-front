import { useContext, useState } from "react";
import { Alert, Button, Form, Input } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import "./Login.css";
import { Loader } from "../../components";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export type UserCredentials = {
  user: string
  password: string
}

const initCredentials: UserCredentials = {
  user: "",
  password: "",
};

export const Login = () => {
  const [credentials] = useState<UserCredentials>(initCredentials);
  const { logIn, isLoading, errorServer, user, isLoadingContext } = useContext(AuthContext);
  const navigate = useNavigate()

  if (user.role === 'operator') return navigate('/empresas')
  if (user.role !== '') return navigate('/home')

  const onLogin = (values: UserCredentials) => {
    logIn(values);
  };

  if (isLoadingContext) return null

  return (
    <div className="container">
      {isLoading && <Loader show={isLoading} />}
      <div className="login_container">
        {!!errorServer &&  (
          <Alert message={"Usuario o Contraseña incorrecta"} type="error" />
        )}
        <div className="title">SEGECO</div>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onLogin}
        >
          <Form.Item
            name="user"
            rules={[
              { required: true, message: "Porfavor introduzca su usuario" },
            ]}
          >
            <Input
              value={credentials.user}
              name="user"
              size="large"
              placeholder="usuario"
              prefix={<UserOutlined />}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Porfavor introduzca su contraseña" },
            ]}
          >
            <Input.Password
              value={credentials.password}
              name="password"
              size="large"
              placeholder="contraseña"
              prefix={<LockOutlined />}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
