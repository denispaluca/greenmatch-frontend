import { Button, Progress, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PowerPlantOffer } from '../../types';

interface OffersTableProps {
  offers: PowerPlantOffer[];
}

const columns: ColumnType<PowerPlantOffer>[] = [
  {
    title: 'Logo',
    dataIndex: 'companyLogo',
    render: (value) => <img
      src={value}
      width={100}
      alt="logo"
    />,
  },
  {
    title: 'Company Infos',
    dataIndex: 'companyName',
    sorter: (a, b) => a.companyName.localeCompare(b.companyName),
    render: (v, offer) =>
      <>
        <h3>{offer.companyName} - {offer.powerplantName}</h3>
        Website: <a href={offer.website}>{offer.website}</a>
        <br />
        Power Plant Location: {offer.powerplantLocation}
      </>,
  },
  {
    width: 300,
    title: 'Capacity',
    render: (v, offer) =>
      <>
        <Progress
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
          percent={Math.round(
            (1 - offer.remainingCapacity / offer.maxCapacity) * 10000) / 100}
        />
        {offer.remainingCapacity} kWh Left
      </>,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.price - b.price,
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
  const buttonCol: ColumnType<PowerPlantOffer> = {
    title: 'PPA Conclusion',
    render: (value, offer) => {
      return (
        <Button
          type="primary"
          onClick={() => navigate(`/offers/${offer.id}`)}
        >Continue
        </Button>
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
