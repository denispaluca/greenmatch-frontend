import { Button, Checkbox, CheckboxOptionType, Form, InputNumber, Space, Switch } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { EnergyType } from '../components';

const dummyData = [{
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
},
{
  id: 5,
  name: 'Power Plant 5',
  location: 'Hamburg',
  type: EnergyType.Wind,
  live: false,
  currentPrice: 10,
  capacity: 1000,
  duration: [5, 10],
}
]

export function PowerPlantSettings() {

  /* ID of the power plant */
  const { id } = useParams()
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const durationOptions: CheckboxOptionType[] = [
    { label: '5 Years', value: 5 },
    { label: '10 Years', value: 10 },
    { label: '15 Years', value: 15 },
  ];

  const handleSave = () => {
    if (form.getFieldValue("status") === undefined) {
      /* Has to be set to true or false depending on the status of the power plant stored in the DB */
      form.setFieldsValue({ "status": checked(id) })
    }
    form
      .validateFields()
      .then(values => {
        console.log('Received values of form: ', values);
        navigate("/")
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  /* Decides based on the ID of the power plant whether the status switch should be activated or not */
  const checked = (id: string | undefined) => {
    if (dummyData[Number(id) - 1].live === false) {
      return false
    } else {
      return true
    }
  }

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
      <Form {...layout}
        form={form}
        name="basic"
      >
        <Form.Item
          label="Capacity"
          name="capacity"
          rules={[{ required: true, message: 'Please input the yearly capacity of the power plant!' }]}>
          <Space>
            <InputNumber style={{ width: "100%" }} type="number" onChange={value => form.setFieldsValue({ "capacity": value })} min={0} /><div>kWh per Year</div>
          </Space>
        </Form.Item>
        <Form.Item
          label="Current Price"
          name="currentPrice"
          rules={[{ required: true, message: 'Please input the current price per kWh!' }]}>
          <Space>
            <InputNumber style={{ width: "100%" }} type="number" onChange={value => form.setFieldsValue({ "currentPrice": value })} min={0} /><div>Cents per kWh</div>
          </Space>
        </Form.Item>
        <Form.Item
          label="PPA Duration"
          name="duration"
          rules={[{ required: true, message: 'Please check the possible PPA durations!' }]}>
          <Checkbox.Group options={durationOptions} />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status">
          <Space>
            <Switch defaultChecked={checked(id)} checkedChildren="Online" unCheckedChildren="Offline" onChange={value => form.setFieldsValue({ "status": value })} />
          </Space>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Space>
            <Button onClick={() => { navigate(-1) }}>Cancel</Button>
            <Button type="primary" htmlType="submit" onClick={handleSave}>Save</Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  )
}

export default PowerPlantSettings;