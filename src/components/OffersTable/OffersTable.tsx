import { Button, Progress, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Offer } from '../../types/offer';

interface OffersTableProps {
  offers: Offer[];
}

const columns: ColumnType<Offer>[] = [
  {
    dataIndex: 'companyLogo',
    render: (value) => <img
      src={value}
      width={100}
      alt="logo"
    />,
  },
  {
    render: (v, offer) =>
      <>
        <h3>{offer.supplierName} - {offer.name}</h3>
        Website: <a href={offer.supplierWebsite}>{offer.supplierWebsite}</a>
        <br />
        Power Plant Location: {offer.location}
      </>,
  },
  {
    width: 300,
    render: (v, offer) =>
      <>
        <Progress
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
          percent={Math.round(
            (1 - offer.availableCapacity / offer.capacity) * 10000) / 100}
        />
        {offer.availableCapacity} kWh Left
      </>,
  },
  {
    render: (v, offer) =>
      <>
        {offer.energyType}
        <br />
        {offer.price} Cent/kWh
      </>,
  },
];

const OffersTable: React.FC<OffersTableProps> = ({ offers }) => {
  const navigate = useNavigate();
  const buttonCol: ColumnType<Offer> = {
    render: (value, offer) => {
      return (
        <Button
          type="primary"
          onClick={() => navigate(`/offers/${offer._id}`)}
        >Continue
        </Button>
      );
    },
  };
  return (<Table
    columns={columns.concat(buttonCol)}
    showHeader={false}
    dataSource={offers}
  />);
};

export { OffersTable };
