import React, { useState } from "react";
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
  IconButton,
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Periods, CarsData } from "../../types/types";
import { useAxiosGet } from "../../hooks/useAxiosGet";
import axios from "axios";

const Car = () => {
  const [carsData] = useAxiosGet<CarsData[] | null>(`${CARS_URL}`, []);

  const { id } = useParams();
  const [numberOfDays, setNumberOfDays] = useState<number>(0);
  const [periodsRented, setPeriodsRented] = useState<Periods[]>([]);

  const selectedCarData = carsData?.find((car) => {
    return car.id.toString() === id;
  });

  const handleCarRent = (rangeRented: any) => {
    const datesSelected = {
      from: rangeRented[0],
      to: rangeRented[1],
    };

    // fetch(`${CARS_URL}/${selectedCarData?.id}`, {
    //   method: "PATCH",
    //   headers: { "Content-Type": "application/json; charset=UTF-8" },
    //   body: JSON.stringify({ datesRented: [datesSelected] }),

    axios.patch(
      `${CARS_URL}/${selectedCarData?.id}`,
      { datesRented: [datesSelected] },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
  };

  const addDays = () => {
    setNumberOfDays((prev) => prev + 1);
  };

  const subtractDays = () => {
    setNumberOfDays((prev) => prev - 1);
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
        />
        <Typography variant="h5">Year: {selectedCarData?.year}</Typography>
        <Typography variant="h5">Milage: {selectedCarData?.milage}</Typography>
        <Typography variant="h5">
          Price per day: {selectedCarData?.price}
        </Typography>
        <div className="calc-container">
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Fee calculator
          </Typography>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Rent period in days</TableCell>
                  <TableCell align="right">Fee (PLN)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <IconButton onClick={() => subtractDays()}>
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                    {numberOfDays}
                    <IconButton onClick={addDays}>
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    {selectedCarData?.price !== undefined
                      ? Number(`${selectedCarData.price}`) * numberOfDays
                      : "no car selected to rent"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <DateRangePicker
          appearance="default"
          style={{ width: 230 }}
          editable={false}
          onOk={(values) => handleCarRent(values)}
        />
      </div>
    </>
  );
};

export default Car;
