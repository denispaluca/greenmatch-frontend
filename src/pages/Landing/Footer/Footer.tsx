/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Modal } from 'antd';
import React, { useState } from 'react';
import styles from './Footer.module.scss';

const loremText =
  <div>
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr,sed diam nonumy
    eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
    voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
    amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
    diam voluptua.At vero eos et accusam et justo duo dolores et ea rebum.Stet
    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
    amet.
  </div>;

const Footer: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState('');

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function showModal(title: string) {
    setTitle(title);
    setIsModalVisible(true);
  }

  return (
    <>
      <Modal
        title={title}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>{loremText}</div>
      </Modal>
      <div className={styles.footer}>
        <div className={styles.container}>
          <p>GreenMatch</p>
          <ul>
            <li className="nav-item">
              <span
                onClick={() => showModal('Imprint')}
              >
                Imprint
              </span>
            </li>
            <li className="nav-item">
              <span
                onClick={() => showModal('Privacy Policy')}
              >
                Privacy Policy
              </span>
            </li>
            <li className="nav-item">
              <span
                onClick={() => showModal('Terms of Use')}
              >
                Terms of Use
              </span>
            </li>
          </ul>
        </div>
      </div >
    </>
  );
};
export default Footer;
