import {
  Button,
  Row,
  Col,
  Steps,
  Form,
  Input,
  Radio,
  InputNumber,
  Checkbox,
  Result,
} from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ContractDetails } from "../../components";

const { Step } = Steps;

interface ppaContractDetails {
  supplier: string;
  buyer: string;
  type: string;
  plant: string;
  duration: number;
  amount: number;
  price: number;
  start: Date;
  owner: string;
  iban: string;
}

const dummyData: ppaContractDetails = {
  supplier: "Grünstrom AG",
  buyer: "Energiesucher GmbH",
  type: "Solar",
  plant: "Solar Park Munich",
  duration: 10,
  amount: 10000,
  price: 20,
  start: new Date("1 Jul 2022"),
  owner: "dummy",
  iban: "dummy",
};

/* In order to set filter values as default handover of this parameters is necessary */
export function Conclusion() {
  const [step, setStep] = useState(0);
  const [ppaForm] = Form.useForm();
  const [paymentForm] = Form.useForm();
  const [ppaProps, setPpaProps] = useState<ppaContractDetails>(dummyData);

  const handleNext = () => {
    ppaForm
      .validateFields()
      .then((values) => {
        console.log("Form Values ", values);
        setStep((prev) => prev + 1);
        setPpaProps((prev) => Object.assign(prev, values));
      })
      .catch((info) => {
        console.log("Validate failed: ", info);
      });
  };

  /*Use this function to init payment process in the backend + store newly created ppa in db
    ToDo: Set link for buttons to correct location of filter page
  */
  const handleBuy = () => {
    paymentForm
      .validateFields()
      .then((values) => {
        setPpaProps((prev) => Object.assign(prev, values));
        console.log("PPA Contract Details: ", ppaProps);
        setStep((prev) => prev + 1);
        ppaForm.resetFields();
        paymentForm.resetFields();
      })
      .catch((info) => {
        console.log("Validation failed: ", info);
      });
  };

  const conclusionForm = useMemo(() => {
    if (step === 0) {
      return (
        <>
          <Row justify="center">
            <Col offset={6} span={12}>
              <h2>PPA Properties</h2>
            </Col>
          </Row>
          <Row justify="center">
            <Col offset={6} span={12}>
              <Form
                name="ppa_props"
                layout="vertical"
                form={ppaForm}
                wrapperCol={{ span: 18 }}
                initialValues={{ amount: 1000 }}
                autoComplete="off"
              >
                <Form.Item
                  label="Duration"
                  name="duration"
                  rules={[
                    { required: true, message: "Please select duration" },
                  ]}
                >
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button value="5">5 Years</Radio.Button>
                    <Radio.Button value="10">10 Years</Radio.Button>
                    <Radio.Button value="15">15 Years</Radio.Button>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  label="Amount per Year in kWh"
                  name="amount"
                  rules={[
                    { required: true, message: "Please specify amount!" },
                  ]}
                >
                  <InputNumber
                    style={{ width: "100%" }}
                    min={0}
                    formatter={(value) =>
                      `${value} kWh`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                  />
                </Form.Item>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col span={4} offset={4}>
              <Link to="/">
                <Button type="text">
                  <LeftOutlined /> Listing
                </Button>
              </Link>
            </Col>
            <Col span={4} offset={12}>
              <Button type="text" onClick={handleNext}>
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
            <Col offset={6} span={12}>
              <h2>Confirm Contract Details</h2>
            </Col>
          </Row>
          <Row justify="center">
            <Col offset={6} span={12}>
              <ContractDetails
                ppaData={dummyData}
                labelWidth={8}
                contentWidth={12}
              />
            </Col>
          </Row>
          <Row>
            <Col span={4} offset={4}>
              <Button type="text" onClick={() => setStep((prev) => prev - 1)}>
                <LeftOutlined /> Back
              </Button>
            </Col>
            <Col span={4} offset={12}>
              <Button type="text" onClick={handleNext}>
                Confirm <RightOutlined />
              </Button>
            </Col>
          </Row>
        </>
      );
    } else if (step === 2) {
      return (
        <>
          <Row justify="center">
            <Col offset={6} span={12}>
              <h2>Payment Details</h2>
            </Col>
          </Row>
          <Row justify="center">
            <Col offset={6} span={12}>
              <Form
                name="payment"
                layout="vertical"
                form={paymentForm}
                wrapperCol={{ span: 18 }}
                initialValues={{ amount: 1000 }}
                autoComplete="off"
              >
                <Form.Item
                  label="Account Owner"
                  name="owner"
                  rules={[
                    { required: true, message: "Please input account owner!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="IBAN"
                  name="iban"
                  rules={[{ required: true, message: "Please input IBAN!" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error(
                                "Please accept monthly payments via direct debit"
                              )
                            ),
                    },
                  ]}
                >
                  <Checkbox>
                    I agree to get charged a monthly fee by via direct debit
                  </Checkbox>
                </Form.Item>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col span={4} offset={4}>
              <Button type="text" onClick={() => setStep((prev) => prev - 1)}>
                <LeftOutlined /> Back
              </Button>
            </Col>
            <Col span={4} offset={12}>
              <Button type="text" onClick={handleBuy}>
                {" "}
                Buy <RightOutlined />
              </Button>
            </Col>
          </Row>
        </>
      );
    } else {
      return (
        <Result
          status="success"
          title="Successfully concluded PPA!"
          subTitle="Congratulations your PPA has been concluded. You will find a corresponding acknowledement E-mail in your postbox"
          extra={[
            <Link to="/">
              <Button type="primary">Back to PPA Listing</Button>
            </Link>,
          ]}
        />
      );
    }
  }, [step]);

  return (
    <>
      <Row>
        <Col span={12} offset={6}>
          <Steps current={step}>
            <Step title="PPA Properties" />
            <Step title="Confirm" />
            <Step title="Payment" />
            <Step title="Done" />
          </Steps>
        </Col>
      </Row>
      <Row>
        <Col span={12} offset={6}>
          {conclusionForm}
        </Col>
      </Row>
    </>
  );
}
