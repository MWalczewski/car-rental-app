import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";

import { CARS_URL } from "../../mock/URLs";

import { Button, TextField } from "@mui/material";
import "./styles.css";
import { CarsData, CarProps } from "../../types/types";
import axios from "axios";
import { useTranslation } from "react-i18next";

const EditForm = (props: CarProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleEditCar = (values: any) => {
    const { id, brand, model, year, url, milage, price, datesRented } = values;
    const car = {
      id,
      brand,
      model,
      year,
      url,
      milage,
      price,
      datesRented,
    };

    // fetch(`${CARS_URL}/${car.id}`, {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json; charset=UTF-8" },
    //   body: JSON.stringify(car),
    // });

    axios.put(`${CARS_URL}/${car.id}`, car, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    console.log(`${brand} ${model} edited`);
    // alert(`${brand} ${model} edited`);

    navigate("/");
  };
  return (
    <Formik<CarsData>
      initialValues={{
        id: props.id,
        brand: props.brand,
        model: props.model,
        year: props.year,
        url: props.url,
        milage: props.milage,
        price: props.price,
        datesRented: props.datesRented,
      }}
      onSubmit={(values) => handleEditCar(values)}
    >
      {({ handleSubmit, values, handleChange }) => (
        <Form onSubmit={handleSubmit} className="form">
          <TextField
            className="text-field"
            label={t("Brand")}
            type="text"
            name="brand"
            value={values.brand}
            onChange={handleChange}
          />
          <ErrorMessage name="brand" />
          <TextField
            className="text-field"
            label={t("Model")}
            type="text"
            name="model"
            value={values.model}
            onChange={handleChange}
          />
          <ErrorMessage name="model" />
          <TextField
            className="text-field"
            label={t("Year")}
            type="number"
            name="year"
            value={values.year}
            onChange={handleChange}
          />
          <ErrorMessage name="year" />
          <TextField
            className="text-field"
            label={t("Picture URL")}
            type="text"
            name="url"
            value={values.url}
            onChange={handleChange}
          />
          <ErrorMessage name="url" />
          <TextField
            className="text-field"
            label={t("Milage")}
            type="number"
            name="milage"
            value={values.milage}
            onChange={handleChange}
          />
          <ErrorMessage name="milage" />
          <TextField
            className="text-field"
            label={t("Price per day")}
            type="number"
            name="price"
            value={values.price}
            onChange={handleChange}
          />
          <ErrorMessage name="price" />
          <Button className="button" type="submit" variant="contained">
            {t("Submit")}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default EditForm;
