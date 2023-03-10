import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Box, Tabs, Tab } from '@mui/material';
import { RingLoader } from 'react-spinners';

import { authUser, setAuthRedirectPath } from "../../store/reducers/authRdc";
import Button from "../../components/UI/Button/Button";
import TabPanel from "../../components/UI/TabPanel/TabPanel";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [value, setValue] = useState(0);
  const [login, setLogin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const err = useSelector(state => state.rootRdc.authRdc.error);
  const isLoading = useSelector(state => state.rootRdc.authRdc.isLoading);

  const authToken = localStorage.getItem("X-token");

  useEffect(() => {
    console.log("login: ", login)
    if (login) {
      navigate('/contacts');
    }
  }, [login])

  let redirect = null;
  if (authToken) {
    redirect = <Navigate to="/contacts" replace />
  }

  if (isLoading) {
    return <RingLoader color="rgba(54, 107, 214, 1)" />
  }

  const dispatchAction = (isSignup) => {
    dispatch(
      authUser({
        email: email,
        password: password,
        isSignUp: isSignup
      })
    );
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const clickedButton = e.nativeEvent.submitter;
    dispatchAction(clickedButton.name === "signUp");
    setLogin(!login);
    console.log("u submitu")

  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleEmailChange = (event) =>
    setEmail(event.currentTarget.value);
  const handlePasswordChange = (event) => {
    setPassword(event.currentTarget.value);
  };

  return (
    <div>
      {redirect}
      {err}
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs value={value} onChange={handleTabChange} centered>
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <form onSubmit={submitHandler}>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <Button type="submit" name="signIn">Sign In</Button>
          </form>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <form onSubmit={submitHandler}>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
              pattern={"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-+_!@#$%^&*.,?]).{8}$"}
            />
            <Button type="submit" name="signUp">Sign Up</Button>
          </form>
        </TabPanel>
      </Box>
    </div>
  );
};

export default Login;
