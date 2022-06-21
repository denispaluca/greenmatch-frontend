import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Ppa } from "../../types";
import PpaCard from "../../components/PpaCard/PpaCard";
import { Button, Col, Modal, Row, Typography } from "antd";
import { RevenueCard } from "../../components";
import styles from './PpaOverview.module.scss';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 8
  },
  desktop: {
    breakpoint: { max: 3000, min: 1365 },
    items: 6
  },
  miniDesktop: {
    breakpoint: { max: 1365, min: 1138 },
    items: 5
  },
  tablet: {
    breakpoint: { max: 1138, min: 910 },
    items: 4
  },
  miniTablet: {
    breakpoint: { max: 910, min: 685 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 685, min: 450 },
    items: 2
  },
  miniMobile: {
    breakpoint: { max: 450, min: 0 },
    items: 1
  }
};

const tempPpaList: Ppa[] = [
  {
    id: 1,
    duration: 5,
    startDate: "2022-07-01",
    endDate: "2027-07-01",
    cancelled: false,
    price: 0.76,
    volume: 521,
    description: `Lorem ipsum dolor sit amet,
    consectetur adipiscing elit, sed do eiusmod tempor
    incididunt ut labore et dolore magna aliqua`,
    powerplantId: 1,
  },
  {
    id: 2,
    duration: 5,
    startDate: "2022-07-01",
    endDate: "2027-07-01",
    cancelled: true,
    price: 0.76,
    volume: 521,
    description: `Lorem ipsum dolor sit amet,
    consectetur adipiscing elit, sed do eiusmod tempor
    incididunt ut labore et dolore magna aliqua`,
    powerplantId: 1,
  },
  {
    id: 3,
    duration: 5,
    startDate: "2017-07-01",
    endDate: "2022-07-01",
    cancelled: false,
    price: 0.76,
    volume: 521,
    description: `Lorem ipsum dolor sit amet,
    consectetur adipiscing elit, sed do eiusmod tempor
    incididunt ut labore et dolore magna aliqua`,
    powerplantId: 1,
  },
  {
    id: 4,
    duration: 5,
    startDate: "2022-07-01",
    endDate: "2027-07-01",
    cancelled: false,
    price: 0.76,
    volume: 521,
    description: `Lorem ipsum dolor sit amet,
    consectetur adipiscing elit, sed do eiusmod tempor
    incididunt ut labore et dolore magna aliqua`,
    powerplantId: 1,
  },
  {
    id: 5,
    duration: 3,
    startDate: "2019-07-01",
    endDate: "2022-07-01",
    cancelled: false,
    price: 0.76,
    volume: 521,
    description: `Lorem ipsum dolor sit amet,
    consectetur adipiscing elit, sed do eiusmod tempor
    incididunt ut labore et dolore magna aliqua`,
    powerplantId: 1,
  },
  {
    id: 6,
    duration: 5,
    startDate: "2022-07-01",
    endDate: "2027-07-01",
    cancelled: false,
    price: 0.76,
    volume: 521,
    description: `Lorem ipsum dolor sit amet,
    consectetur adipiscing elit, sed do eiusmod tempor
    incididunt ut labore et dolore magna aliqua`,
    powerplantId: 1,
  },
  {
    id: 7,
    duration: 5,
    startDate: "2022-07-01",
    endDate: "2027-07-01",
    cancelled: false,
    price: 0.76,
    volume: 521,
    description: `Lorem ipsum dolor sit amet,
    consectetur adipiscing elit, sed do eiusmod tempor
    incididunt ut labore et dolore magna aliqua`,
    powerplantId: 1,
  },
  {
    id: 8,
    duration: 5,
    startDate: "2022-07-01",
    endDate: "2027-07-01",
    cancelled: false,
    price: 0.76,
    volume: 521,
    description: `Lorem ipsum dolor sit amet,
    consectetur adipiscing elit, sed do eiusmod tempor
    incididunt ut labore et dolore magna aliqua`,
    powerplantId: 1,
  },
  {
    id: 9,
    duration: 5,
    startDate: "2022-07-01",
    endDate: "2027-07-01",
    cancelled: false,
    price: 0.76,
    volume: 521,
    description: `Lorem ipsum dolor sit amet,
    consectetur adipiscing elit, sed do eiusmod tempor
    incididunt ut labore et dolore magna aliqua`,
    powerplantId: 1,
  },
  {
    id: 10,
    duration: 5,
    startDate: "2022-07-01",
    endDate: "2027-07-01",
    cancelled: false,
    price: 0.76,
    volume: 521,
    description: `Lorem ipsum dolor sit amet,
    consectetur adipiscing elit, sed do eiusmod tempor
    incididunt ut labore et dolore magna aliqua`,
    powerplantId: 1,
  },
  {
    id: 11,
    duration: 5,
    startDate: "2022-07-01",
    endDate: "2027-07-01",
    cancelled: false,
    price: 0.76,
    volume: 521,
    description: `Lorem ipsum dolor sit amet,
    consectetur adipiscing elit, sed do eiusmod tempor
    incididunt ut labore et dolore magna aliqua`,
    powerplantId: 1,
  },
  {
    id: 12,
    duration: 5,
    startDate: "2022-07-01",
    endDate: "2027-07-01",
    cancelled: false,
    price: 0.76,
    volume: 521,
    description: `Lorem ipsum dolor sit amet,
    consectetur adipiscing elit, sed do eiusmod tempor
    incididunt ut labore et dolore magna aliqua`,
    powerplantId: 1,
  },
]

const PPAOverView: FunctionComponent = () => {

  const params = useParams();

  const [ppas, setPpas] = useState<Ppa[]>([]);

  const [selectedPpa, setSelectedPpa] = useState<Ppa>();

  const [ppaToCancel, setPpaToCancel] = useState<Ppa>();

  const handleCancelation = (ppa: Ppa) => {
    console.log("cancelling ppa", ppa);
    // Send request here... 
  }

  // Fetch actual data from the backend here later.
  useEffect(() => {
    console.log(params.id);
    setPpas(tempPpaList);
  }, [params]);

  return (
    <div>
      <Modal
        title="PPA Terms of Agreement"
        visible={selectedPpa !== undefined}
        onCancel={() => setSelectedPpa(undefined)}
        footer={[
          <Button key="backInfo" onClick={() => setSelectedPpa(undefined)}>
            Close
          </Button>,
        ]}
      >
        <Typography.Text>
          {selectedPpa?.description}
        </Typography.Text>
      </Modal>
      <Modal
        title={`PPA ${ppaToCancel?.id} Cancellation`}
        visible={ppaToCancel !== undefined}
        onCancel={() => setPpaToCancel(undefined)}
        footer={[
          <Button key="back" onClick={() => setPpaToCancel(undefined)}>
            Close
          </Button>,
          <Button key="ok"
            htmlType="submit"
            danger
            onClick={() => {
              ppaToCancel && handleCancelation(ppaToCancel);
              setPpaToCancel(undefined);
            }}>
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
        className={styles.ppaInfo}>
        Click on any of the PPAs to view the details.
      </Typography.Text>
      <Carousel responsive={responsive}>
        {ppas.map(ppa => (
          <PpaCard
            ppa={ppa}
            key={ppa.id}
            onClick={() => setSelectedPpa(ppa)}
            onCancel={() => setPpaToCancel(ppa)}
          />
        ))}
      </Carousel>
      <Row>
        <Col xs={24} sm={24} md={12}
          className={styles.revenueCardContainer}
        >
          <RevenueCard type="revenue" value={50} />
        </Col>
        <Col xs={24} sm={24} md={12}
          className={styles.revenueCardContainer}
        >
          <RevenueCard type="cost" value={120} />
        </Col>
      </Row>
    </div>
  );
}

export default PPAOverView;
export { PPAOverView };
