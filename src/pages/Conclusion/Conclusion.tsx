import { Button, Row, Col, Steps, Form, Input, Checkbox } from "antd";
import {
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
  RightOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const { Step } = Steps;

export function Conclusion() {
  const [step, setStep] = useState(0);
  const [form] = Form.useForm();

  const handleForm = (values: any) => {
    setStep((prev) => prev + 1);
    console.log(values);
  };

  const handleNext = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Received values of form: ", values);
        setStep(prev => prev + 1);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const conclusionForm = useMemo(() => {
    if (step === 0) {
      return (
        <>
          <Row>
            <Col offset={6} span={12}>
              <h1>PPA Properties</h1>
            </Col>
          </Row>
          <Row>
            <Col offset={6} span={12}>
              <Form
                name="basic"
                form={form}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 8 }}
                initialValues={{ remember: true }}
                autoComplete="off"
              >
                <Form.Item
                  label="Username"
                  name="username"
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
            <Col offset={6} span={6}>
              <Link to="/">
                <Button type="text">
                  <LeftOutlined /> Listing
                </Button>
              </Link>
            </Col>
            <Col span={6} offset={6}>
              <Button
                type="text"
                onClick={handleNext}
              >
                {" "}
                Confirm <RightOutlined />
              </Button>
            </Col>
          </Row>
        </>
      );
    } else if (step === 1) {
      return (
        <>
          <Row>
            <h1>Step {step}</h1>
          </Row>
          <Row>
            <Col span={6}>
              <Button
                type="text"
                onClick={() => {
                  setStep((prev) => prev - 1);
                }}
              >
                <LeftOutlined /> Back
              </Button>
            </Col>
            <Col span={6} offset={12}>
              <Button
                type="text"
                onClick={() => {
                  setStep((prev) => prev + 1);
                }}
              >
                {" "}
                Confirm <RightOutlined />
              </Button>
            </Col>
          </Row>
        </>
      );
    }
  }, [step]);

  return (
    <>
      <Row>
        <Col span={12} offset={6}>
          <Steps current={step}>
            <Step title="Finished" />
            <Step title="In Progress" />
            <Step title="Waiting" />
          </Steps>
        </Col>
      </Row>
      {conclusionForm}
    </>
  );
}
