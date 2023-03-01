import { useState } from "react";
import { useSelector } from "react-redux";
import Favorite from "../../components/Favorite/Favorite";

const Favorites = (props) => {
  const contacts = useSelector(state => state.rootRdc.crudRdc.contacts);
  let row = [];

  for (let fav in contacts) {
    if (fav.isFavorite === "true") {
      row.push(fav);
    }
  }

  const rows = row.map(row => (
    <Favorite
      key={row.id}
      firstname={row.firstName}
      lastname={row.lastName}
      bday={row.Birthday}
      contactType={row.contactType}
      contactValue={row.Contact}
    />
  ))
  return (<>
    {rows}
  </>

  );
}
export default Favorites;
