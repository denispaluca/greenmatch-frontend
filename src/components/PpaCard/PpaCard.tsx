import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Divider, Space, Typography, Col, Row } from 'antd';
import { FunctionComponent, MouseEventHandler } from 'react';
import { Ppa } from '../../types';
import styles from './PpaCard.module.scss';

interface PpaCardProps {
  ppa: Ppa;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const PpaCard: FunctionComponent<PpaCardProps> = ({ ppa, onClick }) => {
  const { Title, Text } = Typography;

  // Get a string date as input and compare with
  // the current date and return true if there is less than one month difference
  const currentDate = new Date();
  const inputDate = new Date(ppa.endDate);
  const diff = Math.abs(currentDate.getTime() - inputDate.getTime());
  const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
  const lessThanOneMonth = diffDays < 30;

  return (
    <div className={styles.ppaCard} onClick={onClick}>
      <Title level={2}>
        PPA: {ppa.id}
        <Divider />
      </Title>
      <Row>
        <Col span={10} className={styles.rowGutter}>
          <Text type="secondary">Price: &nbsp;</Text>
        </Col>
        <Col span={14} className={styles.rowGutter}>
          <Text>{ppa.price}</Text>
        </Col>
        <Col span={10} className={styles.rowGutter}>
          <Text type="secondary">Volume: &nbsp;</Text>
        </Col>
        <Col span={14} className={styles.rowGutter}>
          <Text>{ppa.volume}</Text>
        </Col>
        <Col span={10} className={styles.rowGutter}>
          <Text type="secondary">Cancelled: &nbsp;</Text>
        </Col>
        <Col span={14} className={styles.rowGutter}>
          <Text type={ppa.cancelled ? 'danger' : 'success'}>
            {ppa.cancelled ? 'Yes' : 'No'}
          </Text>
        </Col>
        <Col span={10} className={styles.rowGutter}>
          <Text type="secondary">Start Date: &nbsp;</Text>
        </Col>
        <Col span={14} className={styles.rowGutter}>
          <Text>{ppa.startDate}</Text>
        </Col>
        <Col span={10} className={styles.rowGutter}>
          <Text type="secondary">End Date: &nbsp;</Text>
        </Col>
        <Col span={14} className={styles.rowGutter}>
          <Text type={lessThanOneMonth ? 'danger' : undefined}>
            <Space>
              {ppa.endDate}
              {lessThanOneMonth && (
                <ExclamationCircleOutlined style={{ color: 'red' }} />
              )}
            </Space>
          </Text>
        </Col>
      </Row>
    </div>
  );
};

export default PpaCard;
export { PpaCard };
