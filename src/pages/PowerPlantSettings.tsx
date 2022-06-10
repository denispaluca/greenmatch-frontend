import { Button, Checkbox, Form, InputNumber, Space, Switch } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

function PowerPlantSettings() {

  const { id } = useParams()
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 14 },
  };

  const tailLayout = {
    wrapperCol: { offset: 2, span: 16 },
  };

  const options = [
    { label: '5 Years', value: 5 },
    { label: '10 Years', value: 10 },
    { label: '15 Years', value: 15 },
  ];

  const handleOk = () => {
    if (form.getFieldValue("switch") === undefined) {
      form.setFieldsValue({ "switch": false })
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

  return (
    <>
    <h1>ID: {id}</h1>
    <Form {...layout}
      form={form}
      name="basic"
    >
      <Form.Item
        label="Capacity"
        name="capacity"
        rules={[{ required: true, message: 'Please input the yearly capacity of the power plant!' }]}>
        <Space>
          <InputNumber type="number" onChange={value => form.setFieldsValue({ "capacity": value })} min={1} /><div>kWh per Year</div>
        </Space>
      </Form.Item>
      <Form.Item
        label="Current Price"
        name="price"
        rules={[{ required: true, message: 'Please input the current price per kWh!'}]}>
        <Space>
          <InputNumber type="number" onChange={value => form.setFieldsValue({ "price": value })} min={1} /><div>Cents per kWh</div>
        </Space>
      </Form.Item>
      <Form.Item
        label="PPA Duration"
        name="duration"
        rules={[{ required: true, message: 'Please check the possible PPA durations!'}]}>
        <Checkbox.Group options={options} />
      </Form.Item>
      <Form.Item
        label="Status"
        name="status">
        <Space>
          <Switch checkedChildren="Online" unCheckedChildren="Offline" onChange={value => form.setFieldsValue({ "status": value })} />
        </Space>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Space>
          <Button onClick={() => { navigate(-1) }}>Cancel</Button>
          <Button type="primary" htmlType="submit" onClick={handleOk}>Save</Button>
        </Space>
      </Form.Item>
    </Form>
    </>
  )
}

export default PowerPlantSettings;