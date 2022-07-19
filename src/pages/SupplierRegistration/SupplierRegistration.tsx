import { Row, Col, Card, Form, Input, Button, Steps } from 'antd';
import { useState } from 'react';
import { BankDetails } from '../../types';
import styles from './SupplierRegistration.module.scss';
import { useNavigate } from 'react-router-dom';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { register } from '../../services';
import { dispatch } from '../../state';
import { emailValidator } from '../../validators/email';
import { ibanValidator } from '../../validators/iban';
import { cityValidator, countryValidator } from '../../validators/address';
import { ownerValidator } from '../../validators/accountOwner';
import { urlValidator } from '../../validators/url';

const { Step } = Steps;

export function SupplierRegistration() {
  const [step, setStep] = useState(0);
  const [basicForm] = Form.useForm();
  const [loginForm] = Form.useForm();
  const [bankForm] = Form.useForm();
  const navigate = useNavigate();
  const [basicData, setBasicData] = useState();
  const [bankData, setBankData] = useState<BankDetails>();

  const handleBasicData = () => {
    basicForm
      .validateFields()
      .then((values) => {
        console.log(values);
        setBasicData(values);
        setStep((prev) => prev + 1);
      })
      .catch((info) => {
        console.log('Validation failed', info);
      });
  };

  const handleBankData = () => {
    console.log('handle bank data');
    bankForm
      .validateFields()
      .then((values) => {
        console.log(values);
        setBankData(values);
        setTimeout(() => {
          setStep((prev) => prev + 1);
        }, 100);
      })
      .catch((info) => {
        console.log('Validation failed', info);
      });
  };

  const handleLoginData = async () => {
    const loginValues = await loginForm.validateFields();
    const values = Object.assign(basicData!, bankData, loginValues);
    console.log(values);

    const registerRes = await register(values);
    console.log(registerRes);

    if (registerRes.ok) {
      dispatch({
        type: 'setLogin',
        loginType: 'Supplier',
        email: loginValues.email,
      });
      navigate('/');
    }
  };

  const basic = () => {
    return (
      <div style={{ display: step === 0 ? 'block' : 'none' }}>
        <Row justify="center">
          <Col
            offset={1}
            span={22}
          >
            <h2>Company Information</h2>
          </Col>
        </Row>
        <Row justify="center">
          <Col
            offset={1}
            span={22}
          >
            <Form
              name="basic"
              form={basicForm}
              layout="vertical"
              autoComplete="off"
            >
              <Form.Item
                label="Company Name"
                name="companyName"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Company Name!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Trade Register Number"
                name="hrb"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Trade Register Number!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="City"
                name="city"
                rules={[{
                  validator: (_, value) => {
                    return cityValidator(value);
                  },
                }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Zip Code"
                name="zipcode"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Zipcode!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Street"
                name="street"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Street!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Number"
                name="number"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Number!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Country"
                name="country"
                rules={[
                  {
                    validator: (_, value) => {
                      return countryValidator(value);
                    },
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Company Image URL"
                name="companyImage"
                rules={[
                  {
                    validator: (_, value) => {
                      return urlValidator(value);
                    },
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Company Website"
                name="companyWebsite"
                rules={[
                  {
                    validator: (_, value) => {
                      return urlValidator(value);
                    },
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            <Button
              type="text"
              onClick={() => setStep((prev) => prev - 1)}
            >
              <LeftOutlined /> Back
            </Button>
          </Col>
          <Col
            span={4}
            offset={16}
          >
            <Button
              type="text"
              onClick={handleBasicData}
            >
              {' '}
              Next <RightOutlined />
            </Button>
          </Col>
        </Row>
      </div>
    );
  };

  const bank = () => {
    return (
      <div style={{ display: step === 1 ? 'block' : 'none' }}>
        <Row justify="center">
          <Col
            offset={1}
            span={22}
          >
            <h2>Bank Data</h2>
          </Col>
        </Row>
        <Row justify="center">
          <Col
            offset={1}
            span={22}
          >
            <Form
              name="bank"
              form={bankForm}
              layout="vertical"
              autoComplete="off"
            >
              <Form.Item
                label="Account Owner"
                name="owner"
                rules={[
                  {
                    validator: (_, value) => {
                      return ownerValidator(value);
                    },
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="IBAN"
                name="iban"
                rules={[
                  {
                    required: true,
                    validator: (_, value) => {
                      return ibanValidator(value);
                    },
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            <Button
              type="text"
              onClick={() => setStep((prev) => prev - 1)}
            >
              <LeftOutlined /> Back
            </Button>
          </Col>
          <Col
            span={4}
            offset={16}
          >
            <Button
              type="text"
              onClick={handleBankData}
            >
              {' '}
              Next <RightOutlined />
            </Button>
          </Col>
        </Row>
      </div >
    );
  };

  const login = () => {
    return (
      <div style={{ display: step === 2 ? 'block' : 'none' }}>
        <Row justify="center">
          <Col
            offset={1}
            span={22}
          >
            <h2>Login Data</h2>
          </Col>
        </Row>
        <Row justify="center">
          <Col
            offset={1}
            span={22}
          >
            <Form
              name="login"
              layout="vertical"
              autoComplete="off"
              form={loginForm}
            >
              <Form.Item
                label="E-Mail"
                name="email"
                rules={[
                  {
                    required: true,
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    validator: (_, value) => {
                      return emailValidator(value);
                    },
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            <Button
              type="text"
              onClick={() => setStep((prev) => prev - 1)}
            >
              <LeftOutlined /> Back
            </Button>
          </Col>
          <Col
            span={4}
            offset={16}
          >
            <Button
              type="text"
              onClick={handleLoginData}
            >
              {' '}
              Register <RightOutlined />
            </Button>
          </Col>
        </Row>
      </div >
    );
  };

  return (
    <Row className={styles.register}>
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
          className={styles.registerCard}
          bordered={false}
        >
          <Steps current={step}>
            <Step title="Basic Information" />
            <Step title="Bank Details" />
            <Step title="Login Data" />
          </Steps>
          <Col
            offset={3}
            span={18}
          >
            {basic()}
            {bank()}
            {login()}
          </Col>
        </Card>
      </Col>
    </Row>
  );
}

