import { Row, Col, Card, Form, Input, Button, Steps, FormInstance } from "antd";
import { useEffect, useMemo, useState } from "react";
import { Address, BankDetails } from "../../types";
import styles from "./SupplierRegistration.module.scss";
import { useNavigate } from "react-router-dom";
import {
  BorderTopOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";

const { Step } = Steps;

interface RegistrationFormValues {
  companyName: string;
  email: string;
  city: string;
  zipCode: number;
  street: string;
  number: number;
  country: string;
  hrb: string;
  iban: string;
  owner: string;
  companyImage: string;
  companyWebsite: string;
}

//Query Backend and ask whether uname i.e. email is still available
const checkUsernameAvailability = async (uname: string) => {
  if (uname === "test.test@tum.de") {
    return false;
  } else {
    return true;
  }
};

export function SupplierRegistration() {
  const [step, setStep] = useState(0);
  const [basicForm] = Form.useForm();
  const [loginForm] = Form.useForm();
  const [bankForm] = Form.useForm();
  const navigate = useNavigate();
  const [basicData, setBasicData] = useState();
  const [bankData, setBankData] = useState<BankDetails>();
  const [loginData, setLoginData] = useState();

  // Register new Supplier in Backend
  const registerSupplier = async (values: RegistrationFormValues) => {
    console.log(values);
  };

  const handleBasicData = () => {
    basicForm
      .validateFields()
      .then((values) => {
        console.log(values);
        setBasicData(values);
        setTimeout(() => {
          setStep((prev) => prev + 1);
        }, 100);
      })
      .catch((info) => {
        console.log("Validation failed", info);
      });
  };

  const handleBankData = () => {
    console.log("handle bank data");
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
        console.log("Validation failed", info);
      });
  };

  const handleLoginData = () => {
    loginForm
      .validateFields()
      .then((values) => {
        console.log(values);
        setLoginData(values);
        return registerSupplier(Object.assign(basicData!, bankData, values));
      })
      .then(() => {
        console.log("Sucess");
        navigate("/login");
      })
      .catch((info) => {
        console.log("registration failed", info);
      });
  };

  const registrationForm = () => {
    console.log("Render component");
    if (step === 0) {
      return (
        <>
          <Row justify="center">
            <Col offset={1} span={22}>
              <h2>Company Information</h2>
            </Col>
          </Row>
          <Row justify="center">
            <Col offset={1} span={22}>
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
                      message: "Please input your Company Name!",
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
                      message: "Please input your Trade Register Number!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="City"
                  name="city"
                  rules={[
                    { required: true, message: "Please input your City!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Zip Code"
                  name="zipcode"
                  rules={[
                    { required: true, message: "Please input your Zipcode!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Street"
                  name="street"
                  rules={[
                    { required: true, message: "Please input your Street!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Number"
                  name="number"
                  rules={[
                    { required: true, message: "Please input your Number!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Country"
                  name="country"
                  rules={[
                    { required: true, message: "Please input your Country!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Company Image URL"
                  name="companyImage"
                  rules={[
                    { required: true, message: "Please input your Image URL!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Company Website"
                  name="companyWebsite"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Company Website!",
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
              <Button type="text" onClick={() => setStep((prev) => prev - 1)}>
                <LeftOutlined /> Back
              </Button>
            </Col>
            <Col span={4} offset={16}>
              <Button type="text" onClick={handleBasicData}>
                {" "}
                Next <RightOutlined />
              </Button>
            </Col>
          </Row>
        </>
      );
    } else if (step === 1) {
      return (
        <>
          <Row justify="center">
            <Col offset={1} span={22}>
              <h2>Bank Data</h2>
            </Col>
          </Row>
          <Row justify="center">
            <Col offset={1} span={22}>
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
                      required: true,
                      message: "Please input your Account Owner!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="IBAN"
                  name="iban"
                  rules={[
                    { required: true, message: "Please input your IBAN!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <Button type="text" onClick={() => setStep((prev) => prev - 1)}>
                <LeftOutlined /> Back
              </Button>
            </Col>
            <Col span={4} offset={16}>
              <Button type="text" onClick={handleBankData}>
                {" "}
                Next <RightOutlined />
              </Button>
            </Col>
          </Row>
        </>
      );
    } else {
      return (
        <>
          <Row justify="center">
            <Col offset={1} span={22}>
              <h2>Login Data</h2>
            </Col>
          </Row>
          <Row justify="center">
            <Col offset={1} span={22}>
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
                      validator: async (_, value) => {
                        const check = await checkUsernameAvailability(value);
                        if (check === true) {
                          return Promise.resolve();
                        } else {
                          return Promise.reject(
                            new Error("E-Mail address is already in use")
                          );
                        }
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
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <Button type="text" onClick={() => setStep((prev) => prev - 1)}>
                <LeftOutlined /> Back
              </Button>
            </Col>
            <Col span={4} offset={16}>
              <Button type="text" onClick={handleLoginData}>
                {" "}
                Register <RightOutlined />
              </Button>
            </Col>
          </Row>
        </>
      );
    }
  };

  return (
    <Row className={styles.register}>
      <Col xs={0} sm={12} md={14} lg={16} />
      <Col xs={24} sm={12} md={10} lg={8}>
        <Card className={styles.registerCard} bordered={false}>
          <Steps current={step}>
            <Step title="Basic Information"/>
            <Step title="Bank Details" />
            <Step title="Login Data" />
          </Steps>
          <Col offset={3} span={18}>
            <div style={{display: step === 0 ? "block" : "none"}}>
              <Row justify="center">
                <Col offset={1} span={22}>
                  <h2>Company Information</h2>
                </Col>
              </Row>
              <Row justify="center">
                <Col offset={1} span={22}>
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
                          message: "Please input your Company Name!",
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
                          message: "Please input your Trade Register Number!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="City"
                      name="city"
                      rules={[
                        { required: true, message: "Please input your City!" },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Zip Code"
                      name="zipcode"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Zipcode!",
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
                          message: "Please input your Street!",
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
                          message: "Please input your Number!",
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
                          required: true,
                          message: "Please input your Country!",
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
                          required: true,
                          message: "Please input your Image URL!",
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
                          required: true,
                          message: "Please input your Company Website!",
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
                <Col span={4} offset={16}>
                  <Button type="text" onClick={handleBasicData}>
                    {" "}
                    Next <RightOutlined />
                  </Button>
                </Col>
              </Row>
            </div>
            <div style={{display: step === 1 ? "block" : "none"}}>
              <Row justify="center">
                <Col offset={1} span={22}>
                  <h2>Bank Data</h2>
                </Col>
              </Row>
              <Row justify="center">
                <Col offset={1} span={22}>
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
                          required: true,
                          message: "Please input your Account Owner!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="IBAN"
                      name="iban"
                      rules={[
                        { required: true, message: "Please input your IBAN!" },
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
                <Col span={4} offset={16}>
                  <Button type="text" onClick={handleBankData}>
                    {" "}
                    Next <RightOutlined />
                  </Button>
                </Col>
              </Row>
            </div>
            <div style={{display: step === 2 ? "block" : "none"}}>
              <Row justify="center">
                <Col offset={1} span={22}>
                  <h2>Login Data</h2>
                </Col>
              </Row>
              <Row justify="center">
                <Col offset={1} span={22}>
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
                          validator: async (_, value) => {
                            const check = await checkUsernameAvailability(
                              value
                            );
                            if (check === true) {
                              return Promise.resolve();
                            } else {
                              return Promise.reject(
                                new Error("E-Mail address is already in use")
                              );
                            }
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
                          message: "Please input your password!",
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
                <Col span={4} offset={16}>
                  <Button type="text" onClick={handleLoginData}>
                    {" "}
                    Register <RightOutlined />
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Card>
      </Col>
    </Row>
  );
}
