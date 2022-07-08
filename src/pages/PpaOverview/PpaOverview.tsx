import { FunctionComponent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import PpaCard from '../../components/PpaCard/PpaCard';
import { Button, Col, Modal, Row, Typography } from 'antd';
import { RevenueCard } from '../../components';
import styles from './PpaOverview.module.scss';
import PPAProvider from '../../services/api/PPAProvider';
import { PPA } from '../../types/ppa';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 8,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1365 },
    items: 6,
  },
  miniDesktop: {
    breakpoint: { max: 1365, min: 1138 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1138, min: 910 },
    items: 4,
  },
  miniTablet: {
    breakpoint: { max: 910, min: 685 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 685, min: 450 },
    items: 2,
  },
  miniMobile: {
    breakpoint: { max: 450, min: 0 },
    items: 1,
  },
};

const GREENMATCH_FEE = 0.015;

const PPAOverView: FunctionComponent = () => {
  const params = useParams();

  const [ppas, setPpas] = useState<PPA[]>([]);

  const [selectedPpa, setSelectedPpa] = useState<PPA>();

  const [ppaToCancel, setPpaToCancel] = useState<PPA>();

  const [revenues, setRevenues] = useState<number>();
  const [costs, setCosts] = useState<number>();

  const handleCancelation = (ppa: PPA) => {
    PPAProvider.cancel(ppa._id)
      .then(() => {
        console.log('cancelling ppa', ppa);
      })
      .catch((error) => {
        console.log('Failed to cancel PPA', error);
      });
  };

  // Fetch actual data from the backend here later.
  useEffect(() => {
    console.log(params.id);
    PPAProvider.list(params.id!)
      .then((ppaList) => {
        console.log('Ppas of Powerplant', ppaList);
        setPpas(ppaList);
        const rev = ppaList.reduce((accumulator, object) => {
          return accumulator + ((object.amount) * (object.price / 100) *
            object.duration);
        }, 0);
        setCosts(rev * GREENMATCH_FEE);
        setRevenues(rev * (1 - GREENMATCH_FEE));
      })
      .catch((error) => {
        console.log('Failed to fetch PPA List of Powerplant', error);
      });
  }, [params]);

  if (!costs || !revenues) {
    return (<div>Loading...</div>);
  }
  return (
    <div>
      <Modal
        title="PPA Terms of Agreement"
        visible={selectedPpa !== undefined}
        onCancel={() => setSelectedPpa(undefined)}
        footer={[
          <Button
            key="backInfo"
            onClick={() => setSelectedPpa(undefined)}
          >
            Close
          </Button>,
        ]}
      >
        <Typography.Text>
          {'Lorem Ipsum..............'}
        </Typography.Text>
      </Modal>
      <Modal
        title={`PPA ${ppaToCancel?._id} Cancellation`}
        visible={ppaToCancel !== undefined}
        onCancel={() => setPpaToCancel(undefined)}
        footer={[
          <Button
            key="back"
            onClick={() => setPpaToCancel(undefined)}
          >
            Close
          </Button>,
          <Button
            key="ok"
            htmlType="submit"
            danger
            onClick={() => {
              ppaToCancel && handleCancelation(ppaToCancel);
              setPpaToCancel(undefined);
            }}
          >
            Cancel PPA
          </Button>,
        ]}
      >
        <Typography.Text>
          Are you sure you want to cancel this PPA?
        </Typography.Text>
      </Modal>
      <Typography.Text
        type="warning"
        ellipsis
        className={styles.ppaInfo}
      >
        Click on any of the PPAs to view the details.
      </Typography.Text>
      <Carousel responsive={responsive}>
        {ppas.map((ppa) => (
          <PpaCard
            ppa={ppa}
            key={ppa._id}
            onClick={() => setSelectedPpa(ppa)}
            onCancel={() => setPpaToCancel(ppa)}
          />
        ))}
      </Carousel>
      <Row>
        <Col
          xs={24}
          sm={24}
          md={12}
          className={styles.revenueCardContainer}
        >
          <RevenueCard
            type="revenue"
            value={revenues}
          />
        </Col>
        <Col
          xs={24}
          sm={24}
          md={12}
          className={styles.revenueCardContainer}
        >
          <RevenueCard
            type="cost"
            value={costs}
          />
        </Col>
      </Row>
    </div>
  );
};

export default PPAOverView;
export { PPAOverView };
