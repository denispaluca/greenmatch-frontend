import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Divider, Space, Typography, Col, Row, Button } from 'antd';
import { FunctionComponent, MouseEventHandler } from 'react';
import { PPA } from '../../types/ppa';
import styles from './PpaCard.module.scss';

interface PpaCardProps {
  ppa: PPA;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onCancel?: MouseEventHandler<HTMLElement>;
}

const PpaCard: FunctionComponent<PpaCardProps> =
  ({ ppa, onClick, onCancel }) => {
    const { Title, Text } = Typography;

    // Get a string date as input and compare with
    // the current date and return true
    // if there is less than one month difference
    const currentDate = new Date();
    const d = new Date(ppa.startDate);
    const endDate = new Date(d.getFullYear() + ppa.duration,
      d.getMonth(), d.getDay());
    const diff = Math.abs(currentDate.getTime() - endDate.getTime());
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    const lessThanOneMonth = diffDays < 30;

    return (
      // eslint-disable-next-line
      <div
        className={styles.ppaCard}
        onClick={onClick}
      >
        <Title level={2}>
          PPA: {ppa._id}
          <Divider />
        </Title>
        <Row>
          <Col
            span={10}
            className={styles.rowGutter}
          >
            <Text type="secondary">Price: &nbsp;</Text>
          </Col>
          <Col
            span={14}
            className={styles.rowGutter}
          >
            <Text>{ppa.price}</Text>
          </Col>
          <Col
            span={10}
            className={styles.rowGutter}
          >
            <Text type="secondary">Volume: &nbsp;</Text>
          </Col>
          <Col
            span={14}
            className={styles.rowGutter}
          >
            <Text>{ppa.amount}</Text>
          </Col>
          <Col
            span={10}
            className={styles.rowGutter}
          >
            <Text type="secondary">Cancelled: &nbsp;</Text>
          </Col>
          <Col
            span={14}
            className={styles.rowGutter}
          >
            <Text type={ppa.canceled ? 'danger' : 'success'}>
              {ppa.canceled ? 'Yes' : 'No'}
            </Text>
          </Col>
          <Col
            span={10}
            className={styles.rowGutter}
          >
            <Text type="secondary">Start Date: &nbsp;</Text>
          </Col>
          <Col
            span={14}
            className={styles.rowGutter}
          >
            <Text>{ppa.startDate}</Text>
          </Col>
          <Col
            span={10}
            className={styles.rowGutter}
          >
            <Text type="secondary">End Date: &nbsp;</Text>
          </Col>
          <Col
            span={14}
            className={styles.rowGutter}
          >
            <Text type={lessThanOneMonth ? 'danger' : undefined}>
              <Space>
                <>
                  {endDate.toString()}
                  {lessThanOneMonth && (
                    <ExclamationCircleOutlined style={{ color: 'red' }} />
                  )}
                </>
              </Space>
            </Text>
          </Col>
        </Row>
        <Button
          type='primary'
          className={styles.ppaCardButton}
          danger
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onCancel && onCancel(e);
          }}
          block
        >
          Cancel
        </Button>
      </div>
    );
  };

export default PpaCard;
export { PpaCard };
