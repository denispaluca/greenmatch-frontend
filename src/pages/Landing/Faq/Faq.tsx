/* eslint-disable max-len */
import { Collapse } from 'antd';
import React from 'react';
import styles from './Faq.module.scss';

const Faq: React.FC = () => {
  const { Panel } = Collapse;
  const ppaDefinition =
    <div style={{ paddingLeft: 8 }}>
      <ul>
        <li>A way to directly sell energy between a power producer and a consumer</li>
        <li>A long-term electricity supply agreement </li>
        <li>A contract which defines the amount of electricity to be supplied, negotiated prices, accounting, and penalties for non-compliance</li>
      </ul>
    </div>
    ;

  const ppaAdvantage =
    <div style={{ paddingLeft: 8 }}>
      <ul>
        <li>Protection against the risk of fluctuating energy prices through fixed electricity rates</li>
        <li>One of the fastest ways to reach sustainability goals</li>
        <li>PPAs add new renewable energy to the power grid.</li>
      </ul>
    </div>
    ;

  const greenmatchFees =
    <div style={{ paddingLeft: 24, color: '#5A5A5A' }}>
      Buyers will be charged monthly via SEPA direct debit by GreenMatch in
      order to pay for their concluded PPA conctract. Upon receipt of payment,
      GreenMatch will take a 1.5% fee for providing its service. Suppliers will
      thus receive in total 98.5% of the PPAs transaction volume.
    </div>
    ;

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
          style={{ fontSize: '1rem' }}
        >
          <Panel
            header={<div style={{ color: '#5A5A5A' }}>What is a Power Purchase Agreement (PPA)?</div>}
            key="1"
          >
            <p>{ppaDefinition}</p>
          </Panel>
          <Panel
            // eslint-disable-next-line max-len
            header={<div style={{ color: '#5A5A5A' }}>Why should I buy a green energy PPA for my company?</div>}
            key="2"
          >
            <p>{ppaAdvantage}</p>
          </Panel>
          <Panel
            header={<div style={{ color: '#5A5A5A' }}>How is GreenMatch earning money?</div>}
            key="3"
          >
            <p>{greenmatchFees}</p>
          </Panel >
        </Collapse >
      </div >
    </div >
  );
};

export { Faq };
