import { Offcanvas, Stack, Button } from "react-bootstrap";
import { useCart } from "../../contexts/CartContext";
import { CarsData, CartItem, CartProps } from "../../types/types";
import { useTranslation } from "react-i18next";
import { useAxiosGet } from "../../hooks/useAxiosGet";
import { CARS_URL } from "../../mock/URLs";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = ({ isOpen }: CartProps) => {
  const [carsData] = useAxiosGet<CarsData[] | null>(`${CARS_URL}`, []);
  const { closeCart, cartItems, clearCart, removeFromCart } = useCart();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleBooking = (item: CartItem, index: number) => {
    const selectedDates = {
      from: item.from,
      to: item.to,
    };

    const selectedCar = carsData?.find((car) => {
      return car.id === item.id;
    });

    const bookingPeriod = selectedCar?.datesRented;

    bookingPeriod?.push(selectedDates);

    axios.patch(
      `${CARS_URL}/${selectedCar?.id}`,
      { datesRented: bookingPeriod },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    removeFromCart(index);
    closeCart();
    navigate(0);
  };

  return (
    <>
      <Offcanvas show={isOpen} onHide={closeCart} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{t("Rental Cart")}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Stack
            gap={3}
            direction="horizontal"
            className="d-flex align-items-center"
          >
            {cartItems.map((item, index) => (
              <div key={index} className="d-flex flex-column pb-3">
                <p>
                  {item.brand} {item.model} from: {item.from} - to: {item.to}
                </p>
                <div className="d-flex flex-row gap-3">
                  <Button
                    variant="danger"
                    onClick={() => removeFromCart(index)}
                  >
                    {t("Remove from Cart")}
                  </Button>
                  <Button
                    variant="success"
                    onClick={() => handleBooking(item, index)}
                  >
                    {t("Book")}
                  </Button>
                </div>
              </div>
            ))}
          </Stack>
          {cartItems.length > 0 ? (
            <Button variant="danger" onClick={() => clearCart()}>
              {t("Clear Cart")}
            </Button>
          ) : (
            <p>{t("Cart is empty")}</p>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Cart;
