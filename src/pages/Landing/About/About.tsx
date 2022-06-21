import { Card, Row } from "antd";
import React from "react";
import styles from "./About.module.scss";

const About: React.FC = () => {
  return (
    <div className={styles.about} id="about">
      <div className={styles.content}>
        <h2>About</h2>
        <ul>
          <li>Central marketplace for buyers and sellers of PPAs</li>
          <li>Easy access & matchmaking</li>
          <li>Transparent prices</li>
        </ul>
        <Row justify="center">
          <Card
            style={{ marginTop: 40, width: 600, border: "0px" }}
            cover={
              <img
                alt="PPA Deal"
                src={require("../../../assets/images/landing/deal.png")}
              />
            }
          ></Card>
        </Row>
      </div>
    </div>
  );
};

export { About };
