import { useEffect } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Favorite from "../../components/Favorite/Favorite";

const Favorites = () => {
  const contacts = useSelector(state => state.rootRdc.crudRdc.contacts);
  const xtoken = localStorage.getItem("X-token");
  const navigate = useNavigate();
  let row = [];

  useEffect(() => {
    if (!xtoken) {
      navigate('/');
    }
  }, [xtoken, navigate])

  for (let fav in contacts) {
    if (contacts[fav].isFavorite) {
      row.push(contacts[fav]);
    }
  }

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
