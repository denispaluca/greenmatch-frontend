/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
import { Button, Space } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Introduction.module.scss';

const Introduction: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div
      className={styles.introduction}
      id="introduction"
    >
      <div className={styles.content}>
        <p>Hi, we are GreenMatch 👋</p>
        <p>A B2B marketplace for green, renewable energy PPAs</p>
        <Space>
          <Button
            style={{ width: 300, height: 70, fontSize: '2rem' }}
            ghost
          >
            <Link to="/register">Register Now</Link>
          </Button>
          <span
            onClick={() => navigate('/offers')}
          >
            ... or just explore the offerings
          </span>
        </Space>
      </div>
    </div >
  );
};

export { Introduction };
