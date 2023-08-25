import React from "react";
import { Button, TextField } from "@mui/material";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { CARS_URL } from "../../mock/URLs";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { CarsData } from "../../types/types";
import axios from "axios";
import { useTranslation } from "react-i18next";

const AddCar = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const carAddValidationSchema = yup.object().shape({
    brand: yup.string().required("brand is required!"),
    model: yup.string().required("model is required!"),
    url: yup.string().required("url is required!"),
    year: yup
      .number()
      .positive("year cannot be lower than 0!")
      .lessThan(2023)
      .required("year is required!"),
    milage: yup
      .number()
      .positive("milage cannot be lower than 0!")
      .required("milage is required!"),
    price: yup
      .number()
      .positive("price cannot be lower than 0!")
      .required("price is required!"),
  });

  const handleAddCar = (values: any) => {
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

    // fetch(`${CARS_URL}`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(car),
    // });

    axios.post<CarsData>(`${CARS_URL}`, car, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    alert("New car added");

    navigate("/");
  };

  return (
    <>
      <div className="add-car-container">
        <h1>{t("Add a car")}</h1>
        <Formik<CarsData>
          initialValues={{
            id: 0,
            brand: "",
            model: "",
            year: "",
            url: "",
            milage: "",
            price: "",
            datesRented: [],
          }}
          validationSchema={carAddValidationSchema}
          onSubmit={(values) => handleAddCar(values)}
        >
          {({ handleSubmit, values, handleChange }) => (
            <Form onSubmit={handleSubmit} className="form">
              <TextField
                className="input-field"
                label={t("Brand")}
                type="text"
                name="brand"
                placeholder={t("car's brand")}
                value={values.brand}
                onChange={handleChange}
              />
              <ErrorMessage name="brand" />
              <TextField
                className="input-field"
                label={t("Model")}
                type="text"
                name="model"
                placeholder={t("car's model")}
                value={values.model}
                onChange={handleChange}
              />
              <ErrorMessage name="model" />

              <TextField
                className="input-field"
                label={t("Year")}
                type="number"
                name="year"
                placeholder={t("car's year")}
                value={values.year}
                onChange={handleChange}
              />
              <ErrorMessage name="year" />

              <TextField
                className="input-field"
                label={t("Picture URL")}
                type="text"
                name="url"
                placeholder={t("car's url")}
                value={values.url}
                onChange={handleChange}
              />
              <ErrorMessage name="url" />

              <TextField
                className="input-field"
                label={t("Milage")}
                type="number"
                name="milage"
                placeholder={t("car's milage")}
                value={values.milage}
                onChange={handleChange}
              />
              <ErrorMessage name="milage" />

              <TextField
                className="input-field"
                label={t("Price per day")}
                type="number"
                name="price"
                placeholder={t("car's price per day")}
                value={values.price}
                onChange={handleChange}
              />
              <ErrorMessage name="price" />
              <Button className="button" type="submit" variant="contained">
                {t("Add a car")}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AddCar;
