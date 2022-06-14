import { CloseCircleFilled, CheckCircleFilled } from '@ant-design/icons';
import { Space } from 'antd';

interface StatusProps {
  live: Boolean;
}

/* Displays either "Online" or "Offline" in the actions section of the power plant card */
export function StatusDisplay({live}: StatusProps) {
  return (
    <>
      {
      (live === true) 
      ? <Space style={{ color: '#6fbf84' }}><CheckCircleFilled />Online</Space>
      : <Space style={{ color: '#ff8178' }}><CloseCircleFilled />Offline</Space>
      }
    </>
  )
}