import { Button, Modal, Input, Form, Cascader, List } from "antd";
import { useEffect, useState } from "react";
import { PowerPlantCard } from "../../components";
import { PowerPlantType, EnergyTypeEnum } from "../../types";

export function Dashboard() {
  const [powerPlants, setPowerPlants] = useState<PowerPlantType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchPowerPlants();
  }, []);

  const fetchPowerPlants = async () => {
    const powerplants = await fetch(
      "https://62a44ae6259aba8e10e5a1d8.mockapi.io/powerplants"
    );
    const ppJson = await powerplants.json();
    const cpp = ppJson.map((p: any) => {
      return {
        ...p,
        duration: [5, 10],
        type: EnergyTypeEnum.Wind,
      };
    });
    setPowerPlants(cpp);
  };

  interface Option {
    value: EnergyTypeEnum;
    label: string;
  }

  const optionArray: Option[] = [
    {
      value: EnergyTypeEnum.Solar,
      label: "Solar",
    },
    {
      value: EnergyTypeEnum.Wind,
      label: "Wind",
    },
    {
      value: EnergyTypeEnum.Hydro,
      label: "Hydro",
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onCreate = (values: any) => {
    setPowerPlants([
      ...powerPlants,
      {
        id: powerPlants.length + 1,
        name: values.name,
        location: values.location,
        type: values.type,
        live: false,
      },
    ]);
    createPP(values);
    setIsModalVisible(false);
  };

  // send POST request and create new power plant
  async function createPP(values: any) {
    try {
      const response = await fetch(
        "https://62a44ae6259aba8e10e5a1d8.mockapi.io/powerplants",
        {
          method: "POST",
          body: JSON.stringify({
            name: values.name,
            location: values.location,
            type: values.type,
            live: false,
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

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Received values of form: ", values);
        form.resetFields();
        onCreate(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  return (
    <>
      <Button onClick={showModal}>Add New Power Plant</Button>
      {/* https://ant.design/components/form/#components-form-demo-form-in-modal */}
      <Modal
        title="Add New Power Plant"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{ modifier: "public" }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input the name of the power plant!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="location"
            label="Location"
            rules={[
              {
                required: true,
                message: "Please input the location of the power plant!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="Type"
            rules={[
              {
                required: true,
                message: "Please input the type of the power plant!",
              },
            ]}
          >
            <Cascader placeholder="Please select" options={optionArray} />
          </Form.Item>
        </Form>
      </Modal>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={powerPlants}
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 6,
          showSizeChanger: false,
          hideOnSinglePage: true,
        }}
        renderItem={(item) => (
          <List.Item>
            <PowerPlantCard powerPlant={item} />
          </List.Item>
        )}
      />
    </>
  );
}

export default Dashboard;
