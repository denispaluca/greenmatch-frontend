import React from 'react';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <p>GreenMatch</p>
        <ul>
          <li className="nav-item">
            <a href='#imprint'>Imprint</a>
          </li>
          <li className="nav-item">
            <a href='#privacy'>Privacy Policy</a>
          </li>
          <li className="nav-item">
            <a href='#terms'>Terms of Use</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Footer;
