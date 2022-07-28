import { LoadingOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  CheckboxOptionType,
  Form,
  InputNumber,
  Space,
  Spin,
  Switch,
  Typography,
} from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PowerPlantProvider from '../../../services/api/PowerPlantProvider';
import {
  PowerPlant,
  PowerPlantUpdate,
  PPADurations,
} from '../../../types/powerplant';
import styles from '../SupplierDashboard.module.scss';

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 14 },
};

const tailLayout = {
  wrapperCol: { offset: 2, span: 16 },
};

const durationOptions: CheckboxOptionType[] = [
  { label: '5 Years', value: 5 },
  { label: '10 Years', value: 10 },
  { label: '15 Years', value: 15 },
];


const encodeDurations = (numberDurations: number[]) => {
  const res: PPADurations = { five: false, ten: false, fifteen: false };
  numberDurations.forEach((element) => {
    if (element === 5) {
      res.five = true;
    }
    if (element === 10) {
      res.ten = true;
    }
    if (element === 15) {
      res.fifteen = true;
    }
  });

  return res;
};

const decodeDurations = (ppaDurations: PPADurations) => {
  const res: number[] = [];
  if (ppaDurations.five) {
    res.push(5);
  }
  if (ppaDurations.ten) {
    res.push(10);
  }
  if (ppaDurations.fifteen) {
    res.push(15);
  }

  return res;
};

export function PowerPlantSettings() {
  const { id } = useParams(); // ID of the power plant in URL
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [powerPlant, setPowerPlant] = useState<PowerPlant>();
  const [disabled, setDisabled] = useState<boolean>();

  /*
  * decides wether the switch to change power plant status should be enabled
  * or not. If price and capacity input > 0 -> enabled
  */
  const onInputChange = () => {
    if (form.getFieldValue('currentPrice') &&
      form.getFieldValue('capacity') > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  useEffect(() => {
    PowerPlantProvider.get(id!)
      .then((pp) => {
        setPowerPlant(pp);
        onInputChange();
      })
      .catch((error) => {
        console.log('Failed to fetch Power Plant', error);
      });
  }, []);


  if (!powerPlant) {
    return <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} />} />;
  }

  const handleSave = () => {
    if (form.getFieldValue('status') === undefined) {
      /*
      * if user did  not toggle the switch, set status property
      * to the status stored in the DB
      */
      form.setFieldsValue({ status: powerPlant.live });
    }
    form
      .validateFields()
      .then(async (values) => {
        console.log('Received values of form: ', values);
        const powerPlantUpdate: PowerPlantUpdate = {
          live: values.status,
          capacity: values.capacity,
          price: values.currentPrice,
          durations: encodeDurations(values.durations),
        };
        await PowerPlantProvider.update(id!, powerPlantUpdate);
        navigate('/powerplants');
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <>
      <div className={styles.supplierdashboard}>
        <h2>{powerPlant.name}</h2>
        <Typography.Text
          style={{ paddingBottom: '20px' }}
          type="warning"
          ellipsis
        >
          Edit the properties of your power plant.
        </Typography.Text>
        <Form
          {...layout}
          form={form}
          name="basic"
        >
          <Form.Item
            label="Capacity"
            initialValue={powerPlant.capacity}
            name="capacity"
            rules={[
              {
                required: true,
                message: 'Please input the yearly capacity of the power plant!',
              },
            ]}
          >
            <InputNumber
              type="number"
              min={1}
              addonAfter="kWh / Year"
              onChange={onInputChange}
            />
          </Form.Item>
          <Form.Item
            label="Current Price"
            name="currentPrice"
            initialValue={powerPlant.price}
            rules={[
              {
                required: true,
                message: 'Please input the current price per kWh!',
              },
            ]}
          >
            <InputNumber
              type="number"
              min={1}
              addonAfter="Cent / kWh"
              onChange={onInputChange}
            />
          </Form.Item>
          <Form.Item
            label="PPA Durations"
            name="durations"
            initialValue={decodeDurations(powerPlant.durations)}
            rules={[
              {
                required: true,
                message: 'Please check the possible PPA durations!',
              },
            ]}
          >
            <Checkbox.Group options={durationOptions} />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
          >
            <Switch
              defaultChecked={powerPlant.live}
              checkedChildren="Online"
              unCheckedChildren="Offline"
              disabled={disabled}
            />
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
              <Button
                type="primary"
                htmlType="submit"
                onClick={handleSave}
              >
                Save
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
