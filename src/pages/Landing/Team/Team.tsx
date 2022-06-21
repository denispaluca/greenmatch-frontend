import { Col, Row } from 'antd';
import React from 'react';
import styles from './Team.module.scss';

const Team: React.FC = () => {
  return (
    <div
      className={styles.team}
      id="team"
    >
      <div className={styles.content}>
        <h2>Our Team</h2>
        <Row
          justify="center"
          gutter={[24, 24]}
        >
          <Col>
            <img
              src={require('../../../assets/images/team/aybars.jpg')}
              alt="Aybars"
              style={{ width: 180, borderRadius: 100 }}
            />
            <p>Aybars</p>
          </Col>
          <Col>
            <img
              src={require('../../../assets/images/team/denis.jpg')}
              alt="Denis"
              style={{ width: 180, borderRadius: 100 }}
            />
            <p>Denis</p>
          </Col>
          <Col>
            <img
              src={require('../../../assets/images/team/jan martin.jpg')}
              alt="Jan Martin"
              style={{ width: 180, borderRadius: 100 }}
            />
            <p>Jan Martin</p>
          </Col>
          <Col>
            <img
              src={require('../../../assets/images/team/sebastian.jpg')}
              alt="Sebastian"
              style={{ width: 180, borderRadius: 100 }}
            />
            <p>Sebastian</p>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export { Team };
