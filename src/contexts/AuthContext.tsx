import { ReactNode, createContext, useState } from "react";

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextTypes = {
  auth: boolean;
  setAuth: (newState: boolean) => void;
};

const initialValue = {
  auth: localStorage.hasOwnProperty("login") ? true : false,
  setAuth: () => {},
};

export const AuthContext = createContext<AuthContextTypes>(initialValue);

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  //Initializing an auth state with value based on localStorage
  const [auth, setAuth] = useState(initialValue.auth);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
