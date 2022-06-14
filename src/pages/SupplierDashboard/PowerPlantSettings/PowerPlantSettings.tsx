import { Button, Checkbox, CheckboxOptionType, Form, InputNumber, Space, Switch } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PowerPlantType, EnergyTypeEnum } from '../../../types';

export function PowerPlantSettings() {

  /* ID of the power plant */
  const { id } = useParams()
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [powerPlant, setPowerPlant] = useState<PowerPlantType>();

  useEffect(() => {
    fetchPowerPlant()
  }, [])

  const fetchPowerPlant = async () => {
    const powerplants = await fetch(`https://62a44ae6259aba8e10e5a1d8.mockapi.io/powerplants/${id}`)
    console.log(powerplants)
    const ppJson = await powerplants.json()
    console.log(ppJson)
    const cpp = {
      ...ppJson,
      duration: [5, 10],
      type: EnergyTypeEnum.Wind
    }

    setPowerPlant(cpp)
  }

  if (!powerPlant) {
    return (
      <div>
        loading
      </div>
    )
  }

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
    if (powerPlant.live === false) {
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
        name="basic">
        <Form.Item
          label="Capacity"
          initialValue={powerPlant.capacity}
          name="capacity"
          rules={[{ required: true, message: 'Please input the yearly capacity of the power plant!' }]}>
          <InputNumber
            type="number"
            onChange={value => form.setFieldsValue({ "capacity": value })}
            min={0}
            addonAfter="kWh / Year" />
        </Form.Item>
        <Form.Item
          label="Current Price"
          name="currentPrice"
          initialValue={powerPlant.currentPrice}
          rules={[{ required: true, message: 'Please input the current price per kWh!' }]}>
          <InputNumber
            type="number"
            onChange={value => form.setFieldsValue({ "currentPrice": value })}
            min={0}
            addonAfter="Cent / kWh" />
        </Form.Item>
        <Form.Item
          label="PPA Duration"
          name="duration"
          initialValue={powerPlant.duration}
          rules={[{ required: true, message: 'Please check the possible PPA durations!' }]}>
          <Checkbox.Group options={durationOptions} />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status">
          <Space>
            <Switch
              defaultChecked={checked(id)}
              checkedChildren="Online"
              unCheckedChildren="Offline"
              onChange={value => form.setFieldsValue({ "status": value })} />
          </Space>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Space>
            <Button onClick={() => { navigate(-1) }}>
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              onClick={handleSave}>
              Save
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  )
}

export default PowerPlantSettings;