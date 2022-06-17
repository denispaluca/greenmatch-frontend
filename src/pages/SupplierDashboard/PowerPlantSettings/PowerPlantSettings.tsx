import { LoadingOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  CheckboxOptionType,
  Form,
  InputNumber,
  Space,
  Spin,
  Switch,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PowerPlantType, EnergyTypeEnum } from "../../../types";

export function PowerPlantSettings() {
  /* ID of the power plant */
  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [powerPlant, setPowerPlant] = useState<PowerPlantType>();

  useEffect(() => {
    fetchPowerPlant();
  }, []);

  const fetchPowerPlant = async () => {
    const powerplants = await fetch(
      `https://62a44ae6259aba8e10e5a1d8.mockapi.io/powerplants/${id}`
    );
    console.log(powerplants);
    const ppJson = await powerplants.json();
    console.log(ppJson);
    const cpp = {
      ...ppJson,
      type: EnergyTypeEnum.Wind,
    };

    setPowerPlant(cpp);
  };

  if (!powerPlant) {
    return <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} />} />;
  }

  const durationOptions: CheckboxOptionType[] = [
    { label: "5 Years", value: 5 },
    { label: "10 Years", value: 10 },
    { label: "15 Years", value: 15 },
  ];

  // send PUT request and edit power plant
  async function editPP(values: any) {
    try {
      const response = await fetch(
        `https://62a44ae6259aba8e10e5a1d8.mockapi.io/powerplants/${id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            name: powerPlant?.name,
            location: powerPlant?.location,
            energyType: powerPlant?.type,
            live: values.status,
            currentPrice: values.currentPrice,
            capacity: values.capacity,
            duration: values.duration,
            id: powerPlant?.type,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log("error message: ", error.message);
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    }
  }

  const handleSave = () => {
    if (form.getFieldValue("status") === undefined) {
      /* Has to be set to true or false depending on the status of the power plant stored in the DB */
      form.setFieldsValue({ status: powerPlant.live });
    }
    form
      .validateFields()
      .then((values) => {
        console.log("Received values of form: ", values);
        editPP(values);
        navigate("/");
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 14 },
  };

  const tailLayout = {
    wrapperCol: { offset: 2, span: 16 },
  };

  return (
    <>
      <h1>Power Plant ID: {id}</h1>
      <Form {...layout} form={form} name="basic">
        <Form.Item
          label="Capacity"
          initialValue={powerPlant.capacity}
          name="capacity"
          rules={[
            {
              required: true,
              message: "Please input the yearly capacity of the power plant!",
            },
          ]}
        >
          <InputNumber
            type="number"
            onChange={(value) => form.setFieldsValue({ capacity: value })}
            min={0}
            addonAfter="kWh / Year"
          />
        </Form.Item>
        <Form.Item
          label="Current Price"
          name="currentPrice"
          initialValue={powerPlant.currentPrice}
          rules={[
            {
              required: true,
              message: "Please input the current price per kWh!",
            },
          ]}
        >
          <InputNumber
            type="number"
            onChange={(value) => form.setFieldsValue({ currentPrice: value })}
            min={0}
            addonAfter="Cent / kWh"
          />
        </Form.Item>
        <Form.Item
          label="PPA Duration"
          name="duration"
          initialValue={powerPlant.duration}
          rules={[
            {
              required: true,
              message: "Please check the possible PPA durations!",
            },
          ]}
        >
          <Checkbox.Group options={durationOptions} />
        </Form.Item>
        <Form.Item label="Status" name="status">
          <Space>
            <Switch
              defaultChecked={powerPlant.live}
              checkedChildren="Online"
              unCheckedChildren="Offline"
              onChange={(value) => form.setFieldsValue({ status: value })}
            />
          </Space>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Space>
            <Button
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" onClick={handleSave}>
              Save
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
}

export default PowerPlantSettings;
