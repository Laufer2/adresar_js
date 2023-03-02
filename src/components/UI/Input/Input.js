import React, { Fragment } from "react";
import classes from "./Input.module.css";
import { Select, TextField, MenuItem, FormControl, InputLabel } from '@mui/material';

//wrapper for form elements
const Input = (props) => {

  let inputElement = null;
  switch (props.fieldtype) {
    case "input":
      inputElement = (
        <InputLabel id="outlined-basic">
          <TextField id="outlined-basic" {...props} name={props.id} onChange={props.onChange} value={props.value} />
        </InputLabel>
      );
      break;
    case "select":
      inputElement = (
        <FormControl fullWidth>
          <InputLabel id="selectLabel">Contact Type</InputLabel>
          <Select
            labelId="selectLabel"
            id={props.id}
            name={props.id}
            value={props.value}
            label="Contact Type"
            onChange={props.onChange}
          >
            <MenuItem value={"Mobile"}>Mobile</MenuItem>
            <MenuItem value={"Telephone"}>Telephone</MenuItem>
            <MenuItem value={"Email"}>Email</MenuItem>
            <MenuItem value={"Pager"}>Pager</MenuItem>
          </Select>
        </FormControl>
      );
      break;
    // case "checkbox":
    //   <Checkbox {...props} onChange={props.onChange} value={props.value} name={props.id} defaultChecked />
    //   break;

    default:
      inputElement = (
        <input className={classes.InputElement} {...props} {...props.inputProps}></input>
      );
  }
  return (
    <>
      {inputElement}
    </>
  );
};

export default Input;