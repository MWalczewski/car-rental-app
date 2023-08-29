import { useParams } from "react-router-dom";
import { CARS_URL } from "../../mock/URLs";
import Typography from "@mui/material/Typography";
import DateRangePicker from "rsuite/DateRangePicker";
import "./styles.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import { CarsData } from "../../types/types";
import { useAxiosGet } from "../../hooks/useAxiosGet";

import { useTranslation } from "react-i18next";
import { useCart } from "../../contexts/CartContext";

const Car = () => {
  const { addToCart } = useCart();
  const [carsData] = useAxiosGet<CarsData[] | null>(`${CARS_URL}`, []);
  const { t } = useTranslation();
  const { id } = useParams();

  const selectedCarData = carsData?.find((car) => {
    return car.id.toString() === id;
  });

  const defaultIMG = (e: any) => {
    e.target.src = carsData?.find((car) => {
      return car.id === Math.floor(Math.random() * 4);
    })?.url;
  };

  const handleCarRent = (rangeRented: any) => {
    const shortDates = (date: string) => {
      return new Date(date).toISOString().split("T")[0];
    };

    const datesSelected = {
      id: selectedCarData?.id,
      brand: `${selectedCarData?.brand}`,
      model: `${selectedCarData?.model}`,
      from: shortDates(rangeRented[0]),
      to: shortDates(rangeRented[1]),
    };
    addToCart(datesSelected);
  };

  return (
    <>
      <div className="car-info-container">
        <Typography variant="h2" sx={{ fontWeight: "bold" }}>
          {selectedCarData?.brand} {selectedCarData?.model}
        </Typography>
        <img
          src={`${selectedCarData?.url}`}
          alt="car logo"
          style={{ width: "400px" }}
          onError={defaultIMG}
        />
        <Typography variant="h5">
          {t("Price per day")}: {selectedCarData?.price}
        </Typography>

        <Typography>{t("Select renting period")}</Typography>
        <DateRangePicker
          appearance="default"
          style={{ width: 230 }}
          editable={false}
          onOk={(values) => handleCarRent(values)}
        />
        <div className="table-container">
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {t("Rental history")}
          </Typography>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>{t("From")}</TableCell>
                  <TableCell>{t("To")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedCarData?.datesRented?.map((period, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell>{period.from}</TableCell>
                      <TableCell>{period.to}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default Car;
