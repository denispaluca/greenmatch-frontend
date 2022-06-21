import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Introduction.module.scss';

const Welcome: React.FC = () => {
  return (
    <div
      className={styles.introduction}
      id="introduction"
    >
      <div className={styles.content}>
        <p>Hi, we are GreenMatch 👋</p>
        <p>A B2B marketplace for green, renewable energy PPAs</p>
        <Button
          size={'large'}
          style={{ width: 300 }}
          ghost
        >
          <Link to="/register">Register Now</Link>
        </Button>
      </div>
    </div>
  );
};

export { Welcome };
