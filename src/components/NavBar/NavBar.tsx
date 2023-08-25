import { useContext } from "react";
import { Button } from "@mui/material";
import "./styles.css";
import Translate from "../../translation/Translate";
import { useTranslation } from "react-i18next";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Container, Navbar, Button as ButtonBS } from "react-bootstrap";
import { useCart } from "../../contexts/CartContext";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { t } = useTranslation();
  const { auth, setAuth } = useContext(AuthContext);
  const { openCart, cartQuantity } = useCart();

  const handleLogOut = () => {
    setAuth(false);
  };

  return (
    <Navbar sticky="top" className="bg-white shadow-sm mb-3">
      <Container>
        <span>
          <h3 className="logo">Rent-A-Car</h3>
        </span>
        <div className="buttons-container">
          <Button>
            <Link to="/">{t("Home Page")}</Link>
          </Button>
          <Button>
            <Link to="/edit">{t("Edit")}</Link>
          </Button>
          <Button>
            <Link to="/add">{t("Add Car")}</Link>
          </Button>
          {auth ? (
            <Button onClick={handleLogOut} variant="outlined">
              <Link to="/">{t("Sign-Out")}</Link>
            </Button>
          ) : (
            <Button variant="outlined">
              <Link to="/login">{t("Sign-In")}</Link>
            </Button>
          )}
          {cartQuantity > 0 && (
            <ButtonBS
              onClick={openCart}
              style={{ width: "3rem", height: "3rem", position: "relative" }}
              variant="outline-primary"
              className="rounded-circle"
            >
              <ShoppingCartIcon />
              <div
                className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                style={{
                  color: "white",
                  width: "1.5rem",
                  height: "1.5rem",
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  transform: "translate(25%, 25%)",
                }}
              >
                {cartQuantity}
              </div>
            </ButtonBS>
          )}

          <Translate />
        </div>
      </Container>
    </Navbar>
  );
};

export default NavBar;
