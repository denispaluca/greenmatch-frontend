import { Row, Col, Card, Form, Input, Button, Steps } from "antd";
import { useMemo, useState } from "react";
import { Address, BankDetails } from "../../types";
import styles from "./SupplierRegistration.module.scss";
import { useNavigate } from "react-router-dom";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useForm } from "antd/lib/form/Form";

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

export function SupplierRegistration() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const [basicDataForm] = Form.useForm();
  const [bankDataForm] = Form.useForm();
  const [loginDataForm] = Form.useForm();

  // Register new Supplier in Backend
  const registerSupplier = (values: RegistrationFormValues) => {
    console.log(values);
    navigate("/login");
  };

  const handleBasicData = () => {
    setStep((prev) => prev + 1);
  };

  const handleBankData = () => {
    setStep((prev) => prev + 1);
  };

  const handleLoginData = () => {};

  const supplierAdminDataForm = useMemo(() => {
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
              layout="vertical"
              initialValues={{ remember: true }}
              autoComplete="off"
              form={basicDataForm}
            >
              <Form.Item
                label="Company Name"
                name="companyName"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Trade Register Number"
                name="hrb"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="City"
                name="city"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Zip Code"
                name="zipcode"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Street"
                name="street"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Number"
                name="number"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Country"
                name="country"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Company Image URL"
                name="companyImage"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Company Website"
                name="companyWebsite"
                rules={[
                  { required: true, message: "Please input your username!" },
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
  }, []);

  const bankDetailForm = useMemo(() => {
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
              name="basic"
              layout="vertical"
              autoComplete="off"
              form={bankDataForm}
            >
              <Form.Item
                label="Account Owner"
                name="owner"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="IBAN"
                name="iban"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col span={4} >
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
  }, []);

  //TODO Implement check for avaiability of email address 
  const loginDetailForm = useMemo(() => {
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
              name="basic"
              layout="vertical"
              autoComplete="off"
              form={loginDataForm}
            >
              <Form.Item
                label="E-Mail"
                name="email"
                rules={[
                  { required: true, message: "Please input your username!" },
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
  }, []);

  const registrationForm = useMemo(() => {
    if (step === 0) {
      return supplierAdminDataForm;
    } else if (step === 1) {
      return bankDetailForm;
    } else {
        return loginDetailForm;
    }
  }, [step]);

  return (
    <Row className={styles.register}>
      <Col xs={0} sm={12} md={14} lg={16} />
      <Col xs={24} sm={12} md={10} lg={8}>
        <Card className={styles.registerCard} bordered={false}>
          <Steps current={step}>
            <Step title="Basic Information" />
            <Step title="Bank Details" />
            <Step title="Login Data" />
          </Steps>
          <Col offset={3} span={18}>
            {registrationForm}
          </Col>
        </Card>
      </Col>
    </Row>
  );
}
