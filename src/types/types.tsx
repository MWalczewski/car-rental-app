export type Periods = {
  from: string;
  to: string;
};

export interface CarsData {
  id: number;
  brand: string;
  model: string;
  year: number | null;
  url: string;
  milage: number | null;
  price: number | null;
  datesRented: Periods[] | null;
}

export type CarProps = {
  id: number;
  brand: string;
  model: string;
  year: number | null;
  url: string;
  milage: number | null;
  price: number | null;
  datesRented: Periods[] | null;
};

export interface LoginData {
  login: string;
  password: string;
}

export interface UsersData {
  id: number;
  login: string;
  password: string;
}
