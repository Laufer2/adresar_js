import { useSelector } from "react-redux";
import Favorite from "../../components/Favorite/Favorite";

const Favorites = (props) => {
  const contacts = useSelector(state => state.rootRdc.crudRdc.contacts);
  let row = [];

  // for (let fav in contacts) {
  //   if (fav.isFavorite === "true") {
  //     row.push(fav);
  //   }
  // }

  const rows = row.map(row => (
    <Favorite
      key={row.id}
      firstname={row.firstName}
      lastname={row.lastName}
      bday={row.bday}
      contactType={row.contactType}
      contactValue={row.contact}
    />
  ))
  return (<>
    {rows}
  </>

  );
}
export default Favorites;
