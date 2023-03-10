import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import _ from 'lodash';

import { patchContact, updateContacts } from "../../store/reducers/crudRdc";
import classes from "./Table.module.css";


export default function Table(props) {
  const [isSelected, setIsSelected] = useState(false);
  const token = localStorage.getItem("X-token");
  const userId = localStorage.getItem("userId");

  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    if (isSelected) {
      navigate('/contacts/' + isSelected);
    }
  }, [isSelected]);

  if (!props.rows) {
    return <div>No contacts found.</div>
  }

  const favoriteButtonClickHandler = (params) => {
    const { id } = params.row;
    const newContacts = _.cloneDeep(props.rows);
    const index = newContacts.findIndex((contact) => contact.id === id);
    newContacts[index].isFavorite = !newContacts[index].isFavorite;

    const contactData = {
      isFavorite: newContacts[index].isFavorite,
      userId: userId,
      key: newContacts[index].key,
      token: token,
      method: "PATCH"
    }
    dispatch(patchContact(contactData))
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "userId", headerName: "ID User" },
    { field: "firstname", headerName: "First name", width: 100 },
    { field: "lastname", headerName: "Last name", width: 100 },
    {
      field: "bday",
      headerName: "Birthday",
      type: "date",
      width: 100,
    },
    {
      field: "contactType",
      headerName: "Contact type",
      width: 110,
    },
    {
      field: "contact",
      headerName: "Contact",
      width: 120,
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
              selected={!!params.row.isFavorite}
              onClick={(event) => {
                event.stopPropagation();
                favoriteButtonClickHandler(params);
              }}
            >
              {!!params.row.isFavorite ? <Favorite /> : <FavoriteBorder />}
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      ),
    },
  ];

  function selectionChangeHandler(selectionModel) {
    setIsSelected(selectionModel);
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
            id: false,
            userId: false,
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
