import { NavLink } from "react-router-dom";

import classes from "./NavigationItem.module.css";

const NavigationItem = ({ to, children }) => {
  let activeStyle = {
    textDecoration: "underline"
  }

  return (
    <li className="nav-item">
      <NavLink
        to={to}
      //style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        {children}
      </NavLink>
    </li>
  );
};

export default NavigationItem;
