import { memo } from 'react';
import Navbar from "../components/Navigation/Navbar/Navbar";
import classes from "./Layout.module.css"
import { Outlet } from "react-router-dom";

const Layout = memo(function Layout(props) {
  return (
    <>
      <Navbar />
      <main className={classes.Content}>{props.children}<Outlet /></main>
    </>
  );
});

export default Layout;
