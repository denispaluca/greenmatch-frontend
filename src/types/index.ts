
export type EnergyTypes = 'wind' | 'solar' | 'hydro';
export type PPADuration = 5 | 10 | 15;
export interface PowerPlantOffer {
  id: string;
  name: string;
  energyType: EnergyTypes;
  duration: PPADuration;
  price: number;
  maxCapacity: number;
  remainingCapacity: number;
  website: string;
  powerplantLocation: string;
  companyName: string;
  companyLogo: string;
  powerplantName: string;
}
export type PowerPlantType = {
  id: number,
  name: string,
  location: string,
  type: EnergyTypeEnum,
  live: boolean,
  currentPrice?: number,
  capacity?: number,
  duration?: number[],
}
export enum EnergyTypeEnum {
  Solar,
  Wind,
  Hydro
}

export type Address = {
  city: string,
  zipCode: number,
  street: string,
  number: number,
  country: string,
}

export type UserData = {
  companyName: string,
  companyId: number,
}

export interface PpaContractDetails {
  supplier: string;
  supplierId: number;
  buyer: string;
  buyerId: number
  type: string;
  plant: string;
  plantId: number,
  duration?: number;
  amount?: number;
  price: number;
  start: Date;
  owner?: string;
  iban?: string;
}

export type Ppa = {
  id: number;
  duration: number;
  startDate: string;
  endDate: string;
  cancelled: boolean;
  price: number;
  volume: number;
  description: string;
  powerplantId: number;
}

export type BankDetails = {
  iban: string,
  owner: string,
}

export interface RegistrationFormValues {
  companyName: string;
  email: string;
  city: string;
  zipCode: number;
  street: string;
  number: number;
  country: string;
  hrb: string;
  iban: string;
  owner: string;
  password: string;
  companyImage: string;
  companyWebsite: string;
}
