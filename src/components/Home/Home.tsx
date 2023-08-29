import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CARS_URL } from "../../mock/URLs";
import "./styles.css";
import { CarsData } from "../../types/types";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Pagination,
} from "@mui/material";
import { useAxiosGet } from "../../hooks/useAxiosGet";
import { useTranslation } from "react-i18next";

const linkStyle = {
  textDecoration: "none",
  color: "black",
};

const Home = () => {
  const [carsData, loading] = useAxiosGet<CarsData[]>(`${CARS_URL}`, []);
  const [page, setPage] = useState(1);
  const { t } = useTranslation();

  let pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(carsData.length / 6); i++) {
    pageNumbers.push(i);
  }

  const indexOfLastCar: number = page * 6;
  const indexOfFirstCar: number = indexOfLastCar - 6;
  const currentCars: CarsData[] = carsData.slice(
    indexOfFirstCar,
    indexOfLastCar
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const defaultIMG = (e: any) => {
    e.target.src = carsData?.find((car) => {
      return car.id === Math.floor(Math.random() * 4);
    })?.url;
  };

  return (
    <>
      <div className="home-page-container">
        <h1>{t("Welcome to the car rental home page!")}</h1>
        <h3>{t("available cars:")}</h3>
        {loading ? (
          <h4>{t("Loading...")}</h4>
        ) : (
          <>
            <Stack spacing={2}>
              <Pagination
                count={pageNumbers.length}
                onChange={handlePageChange}
                page={page}
                variant="outlined"
                shape="rounded"
                showFirstButton
                showLastButton
              />
            </Stack>
            <Grid
              container
              spacing={3}
              display="flex"
              flexWrap="wrap"
              justifyContent="center"
            >
              {currentCars?.map((cars) => {
                return (
                  <Grid item key={cars.id}>
                    <Link to={`/cars/${cars.id}`} style={linkStyle}>
                      <Card sx={{ width: 400 }} elevation={3}>
                        <CardMedia
                          component="img"
                          src={`${cars.url}`}
                          alt="car logo"
                          style={{ width: "400px", height: "200px" }}
                          onError={defaultIMG}
                        />
                        <CardContent>
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{ fontWeight: "bold" }}
                          >
                            {cars.year} {cars.brand} {cars.model}
                          </Typography>
                          <Typography variant="subtitle1" component="div">
                            {t("Price per day")}: {cars.price} PLN
                          </Typography>
                        </CardContent>
                      </Card>
                    </Link>
                  </Grid>
                );
              })}
            </Grid>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
