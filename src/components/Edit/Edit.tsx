import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CARS_URL } from "../../mock/URLs";
import EditForm from "./EditForm";
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
  Box,
  Modal,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { CarsData, CarProps, Periods } from "../../types/types";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useAxiosGet } from "../../hooks/useAxiosGet";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Edit = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [carToEdit, setCarToEdit] = useState<{
    id: number;
    brand: string;
    model: string;
    year: number | null | string;
    url: string;
    milage: number | null | string;
    price: number | null | string;
    datesRented: Periods[] | null;
  }>({
    id: 0,
    brand: "",
    model: "",
    year: 0,
    url: "",
    milage: 0,
    price: 0,
    datesRented: [],
  });

  const [carsData] = useAxiosGet<CarsData[]>(`${CARS_URL}`, []);

  const handleAddToEdit = (car: {
    id: number;
    brand: string;
    model: string;
    year: number | null | string;
    url: string;
    milage: number | null | string;
    price: number | null | string;
    datesRented: Periods[] | null;
  }) => {
    console.log("index of car added to be edited: ", car);
    setCarToEdit(car);
  };

  const DeleteModal = (props: CarProps) => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

    const handleOpenDeleteModal = () => {
      setOpenDeleteModal(true);
    };
    const handleCloseDeleteModal = () => {
      setOpenDeleteModal(false);
    };

    const handleDelete_OpenConfirmationModal = (index: number) => {
      setOpenConfirmationModal(true);
      // below code is working - removing selected car from db.json but commented for the purpose of building app
      axios.delete(`${CARS_URL}/${index}`);
      console.log("index of car to be deleted: " + index);
    };
    const handleCloseConfirmationModal = () => {
      setOpenConfirmationModal(false);
      setOpenDeleteModal(false);
      navigate(0);
    };

    return (
      <>
        <IconButton onClick={() => handleOpenDeleteModal()}>
          <DeleteIcon />
        </IconButton>
        <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
          <Box sx={{ ...style, width: 400 }}>
            <p>
              {t("Are you sure you want to delete this car from database?")}
            </p>
            <Button
              onClick={() => handleDelete_OpenConfirmationModal(props.id)}
            >
              {t("Yes")}
            </Button>
            <Modal
              open={openConfirmationModal}
              onClose={handleCloseConfirmationModal}
            >
              <Box sx={{ ...style, width: 200 }}>
                <p>{t("Car deleted")}</p>
                <Button onClick={handleCloseConfirmationModal}>
                  {t("Close")}
                </Button>
              </Box>
            </Modal>
            <Button onClick={handleCloseDeleteModal}>{t("No")}</Button>
          </Box>
        </Modal>
      </>
    );
  };

  const CarListItem = (props: CarProps) => {
    return (
      <TableRow key={props.id}>
        <TableCell component="th" scope="row">
          {props.brand} {props.model}
        </TableCell>
        <TableCell align="right">{props.year}</TableCell>
        <TableCell align="right">{props.milage}</TableCell>
        <TableCell align="right">{props.price}</TableCell>
        <TableCell align="right">
          <DeleteModal
            id={props.id}
            brand={props.brand}
            model={props.model}
            year={props.year}
            url={props.url}
            milage={props.milage}
            price={props.price}
            datesRented={props.datesRented}
          />
          <IconButton onClick={() => handleAddToEdit(props)}>
            <EditIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <>
      <div className="editor-container">
        <h1>{t("Car Editor")}</h1>
        {Object.keys(carToEdit.brand).length === 0 ? (
          <TableContainer
            component={Paper}
            sx={{ width: "50%", border: "2px solid #1976d2" }}
          >
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>{t("Car")}</TableCell>
                  <TableCell align="right">{t("Year")}</TableCell>
                  <TableCell align="right">{t("Milage")}</TableCell>
                  <TableCell align="right">{t("Price per day")}</TableCell>
                  <TableCell align="right">{t("Action")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {carsData.map((car, index) => (
                  <CarListItem
                    key={index}
                    id={car.id}
                    brand={car.brand}
                    model={car.model}
                    year={car.year}
                    milage={car.milage}
                    price={car.price}
                    url={car.url}
                    datesRented={car.datesRented}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <EditForm
            id={carToEdit.id}
            brand={carToEdit.brand}
            model={carToEdit.model}
            year={carToEdit.year}
            url={carToEdit.url}
            milage={carToEdit.milage}
            price={carToEdit.price}
            datesRented={carToEdit.datesRented}
          />
        )}
      </div>
    </>
  );
};

export default Edit;
