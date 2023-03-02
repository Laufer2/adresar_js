import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import { postContact } from "../../../store/reducers/crudRdc";

const ContactForm = () => {
   const [firstname, setFirstname] = useState('');
   const [lastname, setLastname] = useState('');
   const [bday, setBday] = useState('');
   const [contactType, setContactType] = useState('Mobile');
   const [contact, setContact] = useState('');
   const dispatch = useDispatch();
   const token = localStorage.getItem("X-token");
   const userID = localStorage.getItem("userId");

   const changeHandler = (e) => {
      switch (e.target.name) {
         case "firstname":
            setFirstname(e.target.value);
            break;
         case "lastname":
            setLastname(e.target.value);
            break;
         case "bday":
            setBday(e.target.value);
            break;
         case "contactType":
            setContactType(e.target.value);
            break;
         case "contact":
            setContact(e.target.value);
            break;
         // case "isFavorite":
         //    setIsFavorite(e.target.value)
         //    break;
         default:
            break;
      }
   }

   const formData = [
      { id: "firstname", label: "First Name", fieldtype: "input", value: firstname, inputProps: { maxLength: 20, required: true } },
      { id: "lastname", label: "Last Name", fieldtype: "input", value: lastname, inputProps: { maxLength: 30, required: true } },
      { id: "bday", fieldtype: "input", type: "date", value: bday, inputProps: { required: true } },
      // { id: "isFavorite", fieldtype: "checkbox", type: "checkbox", value: isFavorite },
      { id: "contactType", label: "Contact type", fieldtype: "select", value: contactType, inputProps: { required: true } },
      { id: "contact", label: "Contact", fieldtype: "input", value: contact, inputProps: { required: true } },
   ]

   const inputElements = formData.map(element => (
      <Input key={element.id} {...element} onChange={changeHandler} />
   ))

   const submitHandler = (e) => {
      e.preventDefault();
      const userid = e.nativeEvent.submitter.value
      const contactData = [{
         id: uuidv4(),
         userId: userid,
         firstname: firstname,
         lastname: lastname,
         bday: bday,
         contactType: contactType,
         contact: contact,
         isFavorite: "false"
      },
      {
         token: token,
         method: "post"
      }
      ]
      dispatch(postContact(contactData));
   }

   return (<>
      <Box
         component="form"
         onSubmit={submitHandler}
         sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
         }}
         noValidate
         autoComplete="off"
      >
         {inputElements}
         <Button variant="contained" type="submit" name="add" size="large" value={userID}>ADD</Button>
      </Box>
   </>
   )
}

export default ContactForm;