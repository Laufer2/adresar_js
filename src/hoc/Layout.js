import { useDispatch } from "react-redux";
import Navbar from "../components/Navigation/Navbar/Navbar";
import classes from "./Layout.module.css"
import { Outlet } from "react-router-dom";

const Layout = (props) => {
  const dispatch = useDispatch();
  return (
    <>
      <Navbar />
      <main className={classes.Content}>{props.children}<Outlet /></main>
    </>
  );
};

export default Layout;
