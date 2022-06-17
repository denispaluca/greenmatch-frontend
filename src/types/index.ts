
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
  live: Boolean,
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

export type BankDetails =  {
  iban: string,
  owner: string,
}