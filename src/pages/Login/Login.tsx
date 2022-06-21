import {
  Button,
  Card, Checkbox,
  Form,
  Input,
  Tabs,
  Row,
  Col } from 'antd';
import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dispatch, useStoreState } from '../../state';
import styles from './Login.module.scss';
const { TabPane } = Tabs;

type LoginType = 'Supplier' | 'Consumer';

interface LoginFormValues{
  username: string;
  password: string;
  remember: boolean;
}

export function Login() {
  const loggedIn = useStoreState('loggedIn');
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState<LoginType>('Supplier');

  // User already logged in, redirect to dashboard
  useEffect(()=>{
    if (loggedIn) {
      navigate('/');
    }
  }, [loggedIn, navigate]);

  const submitForm = (values: LoginFormValues) => {
    console.log(values); // Check if values are correct etc.
    console.log(loginType);
    dispatch({
      type: 'setLoginType',
      loginType: loginType,
    });
    // Redirect to dashboard using react router v6
    navigate('/');
  };
  const loginForm = useMemo(()=>
    <Form
      name="basic"
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
              tab="Consumer Login"
              key={'Consumer'}
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
