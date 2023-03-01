import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";
import Logout from "../../../containers/Auth/Logout/Logout";

const NavigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem to="/contacts">Contacts</NavigationItem>
      <NavigationItem to="/contacts/favorites">Favorites</NavigationItem>
      <NavigationItem to="/directory">Directory</NavigationItem>
      <Logout>Logout</Logout>
    </ul>
  );
}

export default NavigationItems;