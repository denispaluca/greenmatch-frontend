import {
  Button,
  Card, Checkbox,
  Form,
  Input,
  Tabs,
  Row,
  Col } from 'antd';
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services';
import { dispatch } from '../../state';
import styles from './Login.module.scss';
const { TabPane } = Tabs;

type LoginType = 'Supplier' | 'Buyer';

interface LoginFormValues{
  username: string;
  password: string;
  remember: boolean;
}

export function Login() {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState<LoginType>('Supplier');
  const [form] = Form.useForm();

  const submitForm = async (values: LoginFormValues) => {
    console.log(values); // Check if values are correct etc.
    console.log(loginType);
    const res = await login(values.username, values.password, loginType);
    if (!res.ok) {
      form.setFields([
        { name: 'username', errors: [res.error || 'Something went wrong'] },
        { name: 'password', errors: [res.error || 'Something went wrong'] },
      ]);
    } else {
      console.log(values.username, 'username');
      dispatch({
        type: 'setLogin',
        loginType: loginType,
        username: values.username,
      });
      navigate('/');
    }
  };
  const loginForm = useMemo(()=>
    <Form
      name="basic"
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 8 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      onFinish={(values)=>submitForm(values)}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button
          type="primary"
          htmlType="submit"
        >
            Submit
        </Button>
      </Form.Item>
    </Form>
  , []);


  return (
    <Row className={styles.login}>
      <Col
        xs={0}
        sm={12}
        md={14}
        lg={16}
      />
      <Col
        xs={24}
        sm={12}
        md={10}
        lg={8}
      >
        <Card
          className={styles.loginCard}
          bordered={false}
        >
          <Tabs
            defaultActiveKey="1"
            centered
            type="card"
            onTabClick={(e)=>setLoginType(e as LoginType)}
          >
            <TabPane
              tab="Supplier Login"
              key={'Supplier'}
            >
              {loginForm}
            </TabPane>
            <TabPane
              tab="Buyer Login"
              key={'Buyer'}
            >
              {loginForm}
            </TabPane>
          </Tabs>
        </Card>
      </Col>
    </Row>
  );
}

export default Login;
