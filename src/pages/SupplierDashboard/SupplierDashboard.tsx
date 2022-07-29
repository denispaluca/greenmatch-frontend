import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Modal,
  Input,
  Form,
  Cascader,
  List,
  Typography,
  Row,
} from 'antd';
import { useEffect, useState } from 'react';
import { PowerPlantCard } from '../../components';
import PowerPlantProvider from '../../services/api/PowerPlantProvider';
import {
  EnergyType,
  PowerPlant,
  PowerPlantCreate,
} from '../../types/powerplant';
import styles from './SupplierDashboard.module.scss';

const optionArray = [
  {
    value: EnergyType.Solar,
    label: 'Solar',
  },
  {
    value: EnergyType.Wind,
    label: 'Wind',
  },
  {
    value: EnergyType.Hydro,
    label: 'Hydro',
  },
];

export function Dashboard() {
  const [powerPlants, setPowerPlants] = useState<PowerPlant[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();


  useEffect(() => {
    PowerPlantProvider.list()
      .then((ppas) => {
        setPowerPlants(ppas);
      })
      .catch((error) => {
        console.log('Failed to fetch PowerPlants', error);
      });
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log('Received values of form: ', values);
        form.resetFields();
        onCreate(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const onCreate = async (values: any) => {
    const newPowerPlant: PowerPlantCreate = {
      name: values.name,
      location: values.location,
      energyType: values.type.pop(),
    };
    await PowerPlantProvider.create(newPowerPlant);
    PowerPlantProvider.list()
      .then((ppas) => {
        console.log('PPas', ppas);
        setPowerPlants(ppas);
      })
      .catch((error) => {
        console.log('Failed to fetch PowerPlants', error);
      });
    setIsModalVisible(false);
  };


  return (
    <>
      <div className={styles.supplierdashboard}>
        <Row>
          <Button
            icon={<PlusOutlined />}
            type='primary'
            size='middle'
            onClick={showModal}
          >Add New Power Plant
          </Button>
        </Row>
        <Row>
          <Typography.Text
            style={{ paddingTop: '20px', paddingBottom: '10px' }}
            type="warning"
            ellipsis
          >
            Click on any of the power plant cards to see the closed PPAs.
          </Typography.Text>
        </Row>
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
            initialValues={{ modifier: 'public' }}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: 'Please input the name of the power plant!',
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
                  message: 'Please input the location of the power plant!',
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
                  message: 'Please input the type of the power plant!',
                },
              ]}
            >
              <Cascader
                placeholder="Please select"
                options={optionArray}
              />
            </Form.Item>
          </Form>
        </Modal>
        <List
          grid={{ gutter: 32, column: 3 }}
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
      </div>
    </>
  );
}

export default Dashboard;
