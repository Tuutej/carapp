import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Addcar from "./Addcar";
import Editcar from "./Editcar";
import { Edit } from "@mui/icons-material";

export default function Carlist() {
  const [cars, setCars] = useState([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch("http://carrestapi.herokuapp.com/cars")
      .then((response) => response.json())
      .then((data) => setCars(data._embedded.cars))
      .catch((err) => console.error(err));
  };

  const deleteCar = (link) => {
    if (window.confirm("Are you sure?")) {
      fetch(link, { method: "DELETE" })
        .then((res) => fetchData())
        .catch((err) => console.error(err));
    }
  };

  const saveCar = (car) => {
    fetch("http://carrestapi.herokuapp.com/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    })
      .then((res) => fetchData())
      .catch((err) => console.error(err));
  };

  const updateCar = (car, link) => {
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    })
      .then((res) => fetchData())
      .catch((err) => console.error(err));
  };

  const columns = [
    {
      field: "brand",
      headerName: "Brand",
      sortable: true,
      filter: true,
      cellStyle: { textAlign: "left" },
    },
    {
      field: "model",
      headerName: "Model",
      sortable: true,
      filter: true,
      cellStyle: { textAlign: "left" },
    },
    {
      field: "color",
      headerName: "Color",
      sortable: true,
      filter: true,
      cellStyle: { textAlign: "left" },
    },
    {
      field: "fuel",
      headerName: "Fuel",
      sortable: true,
      filter: true,
      cellStyle: { textAlign: "left" },
    },
    {
      field: "year",
      headerName: "Year",
      sortable: true,
      filter: true,
      cellStyle: { textAlign: "left" },
    },
    {
      field: "price",
      headerName: "Price",
      sortable: true,
      filter: true,
      cellStyle: { textAlign: "left" },
    },
    {
      cellRendererFramework: ({ data }) => (
        <Editcar updateCar={updateCar} car={data} />
      ),
      sortable: false,
      filter: false,
      cellStyle: { textAlign: "right" },
    },
    {
      cellRendererFramework: (params) => (
        <Button
          variant="text"
          color="error"
          size="small"
          startIcon={<DeleteIcon />}
          onClick={() => deleteCar(params.data._links.self.href)}
        >
          Delete
        </Button>
      ),
      sortable: false,
      filter: false,
      cellStyle: { textAlign: "left" },
    },
  ];

  const rowHeight = 48;

  return (
    <div className="ag-theme-alpine" style={{ height: "500px", width: "100%" }}>
      <Addcar saveCar={saveCar} />
      <AgGridReact
        rowData={cars}
        columnDefs={columns}
        rowHeight={rowHeight}
        domLayout="autoHeight"
      />
    </div>
  );
}
