import { CloseCircleFilled, CheckCircleFilled } from '@ant-design/icons';
import { Space } from 'antd';

export enum StatusType {
  Offline,
  Online
}

interface StatusProps {
  live: StatusType;
}

/* Displays either "Online" or "Offline" in the actions section of the power plant card */
export function StatusDisplay({live}: StatusProps) {
  return (
    <>
      {
      (live === StatusType.Online) 
      ? <Space style={{ color: '#6fbf84' }}><CheckCircleFilled />Online</Space>
      : <Space style={{ color: '#ff8178' }}><CloseCircleFilled />Offline</Space>
      }
    </>
  )
}