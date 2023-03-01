import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

import { patchContact } from "../../store/reducers/crudRdc";
import classes from "./Table.module.css";


export default function Table(props) {
  const [isFav, setIsFav] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const token = localStorage.getItem("X-token");

  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    if (isSelected) {
      navigate(':id');
    }
  }, [isSelected]);

  if (!props.rows) {
    return <div>No contacts found.</div>
  }

  const favoriteButtonClickHandler = (params) => {
    console.log("klik: ", token);
    const { id } = params.row;
    const index = props.rows.findIndex((contact) => contact.id === id);

    const contactData = [{
      isFavorite: !isFav,
      id: id,
      token: token,
      method: "patch"
    }]
    console.log("kuuu", contactData)
    dispatch(patchContact(contactData))
    setIsFav(!isFav);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "userId", headerName: "ID User" },
    { field: "contactType", headerName: "Contact Type" },
    { field: "firstname", headerName: "First name", width: 130 },
    { field: "lastname", headerName: "Last name", width: 130 },
    {
      field: "bday",
      headerName: "Birthday",
      type: "date",
      width: 100,
    },
    {
      field: "contact",
      headerName: "Contact",
      width: 150,
    },
    {
      field: "isFavorite",
      headerName: "Favorites",
      type: "string",
      align: "center",
      width: 80,
      renderCell: (params) => (
        <div>
          <ToggleButtonGroup>
            <ToggleButton
              value="favorite"
              selected={params.row.isFavorite}
              onClick={(event) => {
                event.stopPropagation();
                favoriteButtonClickHandler(params);
              }}
            >
              {params.row.isFavorite ? <Favorite /> : <FavoriteBorder />}
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      ),
    },
  ];
  // const rowClickHandler = (params) => {
  //   alert(params.id);
  // };

  function selectionChangeHandler(selectionModel) {
    console.log(`Selected Rows: ${selectionModel}`);
    setIsSelected(!isSelected);
  }

  return (<>
    <div className={classes.Table} >
      <div style={{ height: 410, width: 700 }}>
        <DataGrid
          rows={props.rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          columnVisibilityModel={{
            userId: false,
            contactType: false,
          }}
          components={{
            Toolbar: GridToolbar,
          }}
          // onRowClick={rowClickHandler}
          onSelectionModelChange={selectionChangeHandler}
        />
      </div>
    </div>
  </>
  );
}
