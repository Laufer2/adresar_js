import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token: null,
  userId: null,
  error: null,
  isLoading: false,
};

export const authUser = createAsyncThunk(
  "authUser",
  async (authData, { dispatch }) => {
    dispatch(authStart());
    const userData = {
      email: authData.email,
      password: authData.password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAVlau1jWtyCOUd8GpCuzlyMqKRtLKMdRo";
    if (authData.isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAVlau1jWtyCOUd8GpCuzlyMqKRtLKMdRo";
    }
    await axios
      .post(url, userData)
      .then((response) => {
        localStorage.setItem("X-token", response.data.idToken);
        //localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);
        dispatch(
          authSuccess({
            idToken: response.data.idToken,
            localId: response.data.localId,
          })
        );
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error));
      });
  }
);

const authSlice = createSlice({
  name: "authRdc",
  initialState,
  reducers: {
    authStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    authSuccess: (state, action) => {
      state.token = action.payload.idToken;
      state.userId = action.payload.localId;
      state.error = null;
      state.isLoading = false;
    },
    authFail: (state, action) => {
      state.error = action.payload.message;
      state.isLoading = false;
    },
    authLogout: (state) => {
      state.token = null;
      state.userId = null;
      state.error = null;
      localStorage.removeItem("X-token");
      localStorage.removeItem("expirationDate");
      localStorage.removeItem("userId");
    },
  },
});


export const {
  authStart,
  authSuccess,
  authFail,
  authLogout,
  setAuthRedirectPath,
} = authSlice.actions;

export default authSlice.reducer;
