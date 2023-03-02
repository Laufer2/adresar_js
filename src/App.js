import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Login from "./containers/Auth/Login";
import Favorites from "./containers/Favorites/Favorites";
import Contacts from "./containers/Contacts/Contacts";
import Contact from "./containers/Contacts/Contact/Contact";
import "./App.css";
import Layout from "./hoc/Layout";
import Test from "./test"
import { useSelector } from "react-redux";
import { RingLoader } from 'react-spinners';

function App() {
  const navigate = useNavigate();
  const xtoken = localStorage.getItem("X-token");
  const isLoading = useSelector(store => store.rootRdc.authRdc.isLoading)
  useEffect(() => {
    if (!xtoken) {
      navigate('/');
    }
  }, [xtoken, navigate])

  if (isLoading) {
    return <RingLoader color="rgba(54, 107, 214, 1)" />
  }

  let routes = (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );

  if (!isLoading) {
    routes = (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/contacts" element={<Contacts />}>
            <Route path="favorites" element={<Favorites />} />
            <Route path=":id" element={<Contact />} />
          </Route>
          <Route path="/directory" element={<Favorites />}></Route>
        </Route>
      </Routes>
    );
  }
  //<Route path="*" element={<Login />} />

  return (
    <div className="App">
      {routes}
    </div>
  );
}

export default App;
