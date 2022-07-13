import { Collapse } from 'antd';
import React from 'react';
import styles from './Faq.module.scss';

const Faq: React.FC = () => {
  const { Panel } = Collapse;
  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
  return (
    <div
      className={styles.faq}
      id="faq"
    >
      <div className={styles.content}>
        <h2>FAQs</h2>
        <Collapse
          defaultActiveKey={['1']}
          ghost
          style={{ fontSize: '1rem', color: 'red' }}
        >
          <Panel
            header="What is a Power Purchase Agreement (PPA)?"
            key="1"
          >
            <p>{text}</p>
          </Panel>
          <Panel
            // eslint-disable-next-line max-len
            header="Why should I buy a PPA instead of closing a normal energy contract?"
            key="2"
          >
            <p>{text}</p>
          </Panel>
          <Panel
            header="How is GreenMatch earning money?"
            key="3"
          >
            <p>{text}</p>
          </Panel>
        </Collapse>
      </div>
    </div >
  );
};

export { Faq };
