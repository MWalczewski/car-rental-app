import { ReactNode } from "react";

export type LoginProps = {
  children?: ReactNode;
};

export type LoginContextType = {
  loggedUser: boolean;
  setLoggedUser: (newState: boolean) => void;
};

export type TranslateProps = {
  children?: ReactNode;
};

export type TranslateContextType = {
  language: string;
  setLanguage: (newState: string) => void;
};

export type Periods = {
  from: string;
  to: string;
};

export interface CarsData {
  id: number;
  brand: string;
  model: string;
  year: number | null | string;
  url: string;
  milage: number | null | string;
  price: number | null | string;
  datesRented: Periods[] | null;
}

export type CarProps = {
  id: number;
  brand: string;
  model: string;
  year: number | null | string;
  url: string;
  milage: number | null | string;
  price: number | null | string;
  datesRented: Periods[] | null;
};

export interface LoginData {
  username: string;
  password: string;
}

export interface UsersData {
  id: number;
  login: string;
  password: string;
}

export type CartProviderProps = {
  children: ReactNode;
};

export type CartItem = {
  id: number | undefined;
  brand: string;
  model: string;
  from: string;
  to: string;
};

export type CartContextTypes = {
  openCart: () => void;
  closeCart: () => void;
  clearCart: () => void;
  addToCart: (data: CartItem) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

export type CartProps = {
  isOpen: boolean;
};
