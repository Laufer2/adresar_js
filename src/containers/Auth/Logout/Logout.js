import { useState } from "react";
import { redirect, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authLogout } from "../../../store/reducers/authRdc";

const Logout = (props) => {
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(null);

  const logoutHandler = (e) => {
    dispatch(authLogout());
    setRedirect(<Navigate to={"/"} />);
  };

  return (
    <>
      {redirect}
      <li onClick={logoutHandler}>
        {props.children}
      </li>
    </>

  )
};

export default Logout;
