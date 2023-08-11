import { createContext, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children?: ReactNode;
};

type LoginContextType = {
  loggedUser: boolean;
  setLoggedUser: (newState: boolean) => void;
};

const initialValue = {
  loggedUser: false,
  setLoggedUser: () => {},
};

const LoginContext = createContext<LoginContextType>(initialValue);

const LoginProvider = ({ children }: Props) => {
  const [loggedUser, setLoggedUser] = useState(initialValue.loggedUser);

  const navigate = useNavigate();

  return (
    <LoginContext.Provider value={{ loggedUser, setLoggedUser }}>
      {children}
    </LoginContext.Provider>
  );
};

export { LoginContext, LoginProvider };
