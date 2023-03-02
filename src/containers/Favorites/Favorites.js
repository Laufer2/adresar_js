import { useSelector } from "react-redux";
import Favorite from "../../components/Favorite/Favorite";

const Favorites = () => {
  const contacts = useSelector(state => state.rootRdc.crudRdc.contacts);
  let row = [];
  console.log(contacts)
  for (let fav in contacts) {
    if (contacts[fav].isFavorite) {
      row.push(contacts[fav]);
    }
  }
  console.log(row)
  const rows = 0;
  return (<>
    {row.map(cell => (
      <Favorite
        key={cell.id}
        firstname={cell.firstname}
        lastname={cell.lastname}
        bday={cell.bday}
        contactType={cell.contactType}
        contactValue={cell.contact}
      />
    ))}
  </>

  );
}
export default Favorites;
