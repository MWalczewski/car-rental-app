import React from "react";
import { Button, TextField } from "@mui/material";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { CARS_URL } from "../../mock/URLs";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { CarsData } from "../../types/types";
import axios from "axios";

const AddCar = () => {
  const navigate = useNavigate();

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
        <h1>Add a car</h1>
        <Formik<CarsData>
          initialValues={{
            id: 0,
            brand: "",
            model: "",
            year: null,
            url: "",
            milage: null,
            price: null,
            datesRented: null,
          }}
          validationSchema={carAddValidationSchema}
          onSubmit={(values) => handleAddCar(values)}
        >
          {({ handleSubmit, values, handleChange }) => (
            <Form onSubmit={handleSubmit} className="form">
              <TextField
                className="input-field"
                label="Brand"
                type="text"
                name="brand"
                placeholder="car's brand"
                value={values.brand}
                onChange={handleChange}
              />
              <ErrorMessage name="brand" />
              <TextField
                className="input-field"
                label="Model"
                type="text"
                name="model"
                placeholder="car's model"
                value={values.model}
                onChange={handleChange}
              />
              <ErrorMessage name="model" />

              <TextField
                className="input-field"
                label="Year"
                type="number"
                name="year"
                placeholder="car's year"
                value={values.year}
                onChange={handleChange}
              />
              <ErrorMessage name="year" />

              <TextField
                className="input-field"
                label="Picture URL"
                type="text"
                name="url"
                placeholder="car's url"
                value={values.url}
                onChange={handleChange}
              />
              <ErrorMessage name="url" />

              <TextField
                className="input-field"
                label="Milage"
                type="number"
                name="milage"
                placeholder="car's milage"
                value={values.milage}
                onChange={handleChange}
              />
              <ErrorMessage name="milage" />

              <TextField
                className="input-field"
                label="Price per day"
                type="number"
                name="price"
                placeholder="car's price per day"
                value={values.price}
                onChange={handleChange}
              />
              <ErrorMessage name="price" />
              <Button className="button" type="submit" variant="contained">
                Add Car
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AddCar;
