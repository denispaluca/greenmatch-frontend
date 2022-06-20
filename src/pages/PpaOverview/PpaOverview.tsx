import {FunctionComponent, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {Ppa} from "../../types";
import PpaCard from "../../components/PpaCard/PpaCard";
import {Button, Modal, Typography} from "antd";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 8
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3
  }
};

const tempPpaList:Ppa[] = [
  {
    id: 1,
    duration: 5,
    startDate: "2022-07-01",
    endDate: "2027-07-01",
    cancelled: false,
    price: 0.76,
    volume: 521,
    description:`Lorem ipsum dolor sit amet,
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
    description:`Lorem ipsum dolor sit amet,
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
    description:`Lorem ipsum dolor sit amet,
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
    description:`Lorem ipsum dolor sit amet,
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
    description:`Lorem ipsum dolor sit amet,
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
    description:`Lorem ipsum dolor sit amet,
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
    description:`Lorem ipsum dolor sit amet,
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
    description:`Lorem ipsum dolor sit amet,
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
    description:`Lorem ipsum dolor sit amet,
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
    description:`Lorem ipsum dolor sit amet,
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
    description:`Lorem ipsum dolor sit amet,
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
    description:`Lorem ipsum dolor sit amet,
    consectetur adipiscing elit, sed do eiusmod tempor
    incididunt ut labore et dolore magna aliqua`,
    powerplantId: 1, 
  },
]

const PPAOverView: FunctionComponent = () => {

  const params = useParams();

  const [ppas, setPpas] = useState<Ppa[]>([]);

  const [selectedPpa, setSelectedPpa] = useState<Ppa>();

    // Fetch actual data from the backend here later.
    useEffect(()=>{
      console.log(params.id);
      setPpas(tempPpaList);
    },[params]);

    return (
      <div>
        <Modal 
          title="PPA Terms of Agreement"
          visible={selectedPpa !== undefined}
          onCancel={() => setSelectedPpa(undefined)}
          onOk={() => setSelectedPpa(undefined)}
          footer={[
          <Button key="back" onClick={() => setSelectedPpa(undefined)}>
            Close
          </Button>,
          ]}
        >
          <Typography.Text>
            {selectedPpa?.description}
          </Typography.Text>
        </Modal>
          <Carousel responsive={responsive}>
            {ppas.map(ppa => (
              <PpaCard 
                ppa={ppa} 
                key={ppa.id} 
                onClick={()=>setSelectedPpa(ppa)}
              /> 
              ))}
            </Carousel>
        </div>
    );
}

export default PPAOverView;
export { PPAOverView };
