import { Button, Progress, Row, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Offer } from '../../types/offer';
import { EnergyTypeDisplay } from '../EnergyTypeDisplay/EnergyTypeDisplay';

interface OffersTableProps {
  offers: Offer[];
}

const columns: ColumnType<Offer>[] = [
  {
    title: 'Logo',
    width: '10%',
    dataIndex: 'supplierImageUrl',
    render: (value) =>
      <Row justify='center'>
        <img
          src={value}
          width={100}
          alt="logo"
        />
      </Row>,
  },
  {
    title: 'Powerplant Infos',
    width: '30%',
    dataIndex: 'companyName',
    sorter: (a, b) => a.supplierName.localeCompare(b.supplierName),
    render: (v, offer) =>
      <>
        <h3>{offer.supplierName} - {offer.name}</h3>
        Website: <a href={offer.supplierWebsite}>{offer.supplierWebsite}</a>
        <br />
        Power Plant Location: {offer.location}
      </>,
  },
  {
    width: '30%',
    title: 'Capacity',
    render: (v, offer) =>
      <>
        <Progress
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
          percent={Math.round(
            (offer.availableCapacity / offer.capacity) * 10000) / 100}
        />
        {offer.availableCapacity} kWh Left
      </>,
  },
  {
    title: 'Price',
    width: '15%',
    dataIndex: 'price',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.price - b.price,
    render: (v, offer) =>
      <>
        <Row justify='center'>
          {offer.price} Cent/kWh
        </Row>
        <br />
        <Row justify='center'>
          <EnergyTypeDisplay
            type={offer.energyType}
            size={'25'}
          />
        </Row>
      </>
    ,
  },
];

const OffersTable: React.FC<OffersTableProps> = ({ offers }) => {
  const navigate = useNavigate();
  const buttonCol: ColumnType<Offer> = {
    title: 'PPA Conclusion',
    render: (value, offer) => {
      return (
        <Row justify='center'>
          <Button
            type="primary"
            onClick={() => navigate(`/offers/${offer._id}`)}
          >Continue
          </Button>
        </Row>
      );
    },
  };
  return (
    <Table
      columns={columns.concat(buttonCol)}
      showHeader={true}
      dataSource={offers}
    />
  );
};

export { OffersTable };
