import { ReactNode, createContext, useState } from "react";

// type AuthContextTypes = {
//   auth: any;
//   setAuth: any;
// };

// const AuthContext = createContext({} as AuthContextTypes);

// type AuthProviderProps = {
//   children: ReactNode;
// };

// export const AuthProvider = ({ children }: AuthProviderProps) => {
//   const [auth, setAuth] = useState({});

//   return (
//     <AuthContext.Provider value={{ auth, setAuth }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextTypes = {
  auth: boolean;
  setAuth: (newState: boolean) => void;
};

const initialValue = {
  auth: false,
  setAuth: () => {},
};

export const AuthContext = createContext<AuthContextTypes>(initialValue);

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  //Initializing an auth state with false value (unauthenticated)
  const [auth, setAuth] = useState(initialValue.auth);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
