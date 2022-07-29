/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Space } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Introduction.module.scss';

const Introduction: React.FC = () => {
  return (
    <div
      className={styles.introduction}
      id="introduction"
    >
      <div className={styles.content}>
        <p>Hi, we are GreenMatch 👋</p>
        <p>A B2B marketplace for green, renewable energy PPAs</p>
        <Space >
          <Button
            style={{
              width: 300,
              height: 70,
              fontSize: '2rem',
              borderWidth: '3px',
            }}
            ghost
          >
            <Link to="/register">Register Now</Link>
          </Button>
          <a
            className={styles.offers}
            href='/offers'
          >
            or just explore the offerings
          </a>
        </Space>
      </div>
    </div >
  );
};

export { Introduction };
