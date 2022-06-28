import { CloseCircleFilled, CheckCircleFilled } from '@ant-design/icons';
import { Space } from 'antd';

interface StatusProps {
  live: Boolean;
}

/* Displays either "Online" or "Offline"
in the actions section of the power plant card */
export function StatusDisplay({ live }: StatusProps) {
  return (
    <>
      {
        (live === true) ?
          <Space style={{ color: '#53c41b' }}>
            <CheckCircleFilled />Online
          </Space> :
          <Space style={{ color: '#ff4d50' }}>
            <CloseCircleFilled />Offline
          </Space>
      }
    </>
  );
}
