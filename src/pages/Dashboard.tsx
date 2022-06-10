import { Row, Col, Button, Modal, Input, Form, Cascader } from 'antd';
import { useEffect, useState } from 'react';
import { PowerPlantType, PowerPlantCard, EnergyType } from '../components';

export function Dashboard() {

  const [powerPlants, setPowerPlants] = useState<PowerPlantType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(() => {
    setPowerPlants([{
      id: 1,
      name: 'Power Plant 1',
      location: 'Munich',
      type: EnergyType.Solar,
      live: true,
      currentPrice: 10,
      capacity: 1000,
      duration: [5, 10],
    },
    {
      id: 2,
      name: 'Power Plant 2',
      location: 'Berlin',
      type: EnergyType.Hydro,
      live: false,
      currentPrice: 10,
      capacity: 1000,
      duration: [5, 10],
    },
    {
      id: 3,
      name: 'Power Plant 3',
      location: 'Cologne',
      type: EnergyType.Wind,
      live: false,
      currentPrice: 10,
      capacity: 1000,
      duration: [5, 10],
    },
    {
      id: 4,
      name: 'Power Plant 4',
      location: 'Hamburg',
      type: EnergyType.Wind,
      live: false,
      currentPrice: 10,
      capacity: 1000,
      duration: [5, 10],
    }
    ])

  }, [])

  interface Option {
    value: EnergyType;
    label: string;
  }

  const optionArray: Option[] = [
    {
      value: EnergyType.Solar,
      label: "Solar"
    },
    {
      value: EnergyType.Wind,
      label: "Wind"
    },
    {
      value: EnergyType.Hydro,
      label: "Hydro"
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
      }
    ])
    setIsModalVisible(false);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        console.log('Received values of form: ', values);
        form.resetFields();
        onCreate(values);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
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
      <Modal title="Add New Power Plant" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{ modifier: 'public' }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the name of the power plant!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: 'Please input the location of the power plant!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: 'Please input the type of the power plant!' }]}
          >
            <Cascader placeholder="Please select" options={optionArray} />
          </Form.Item>
        </Form>
      </Modal>
      <Row gutter={[16, 16]}>
        {powerPlants && powerPlants.map((powerPlant) => (
          <Col span={8}>
            <PowerPlantCard powerPlant={powerPlant} />
          </Col>
        ))
        }
      </Row>
    </>
  );
}

export default Dashboard;