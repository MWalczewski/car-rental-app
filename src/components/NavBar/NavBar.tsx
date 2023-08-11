import { useContext } from "react";
import { LoginContext } from "../../contexts/LoginContext";
import Button from "@mui/material/Button";
import "./styles.css";

const NavBar = () => {
  const { loggedUser, setLoggedUser } = useContext(LoginContext);

  const handleLogOut = () => {
    setLoggedUser(false);
  };

  return (
    <nav className="nav-bar-container">
      <span>
        <h3 className="logo">Rent-A-Car</h3>
      </span>
      <div className="buttons-container">
        <Button href="/">Home Page</Button>
        <Button href="/edit">Edit</Button>
        <Button href="/add">Add Car</Button>
        {loggedUser ? (
          <Button href="/login" onClick={handleLogOut} variant="contained">
            Log-Out
          </Button>
        ) : (
          <Button href="/login" variant="contained">
            Log-In
          </Button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
