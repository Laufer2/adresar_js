import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
   contacts: null,
   responseError: null,
   isLoadin: null,
};

export const getContacts = createAsyncThunk(
   "crudRdc/getContacts",
   async (requestParams, { dispatch }) => {
      const queryParams = '?auth=' + requestParams.token + '&orderBy="userId"&equalTo="' + requestParams.userId + '"';
      let url =
         "https://adresar-dfb64-default-rtdb.europe-west1.firebasedatabase.app/adresar.json" + queryParams;
      axios(url, {
         method: "get",
         headers: {
            "Content-Type": "application/json",
         }
      })
         .then((response) => {
            let contactsArray = [];

            for (let key in response.data) {
               contactsArray.push({ ...response.data[key], key: key });
            }

            dispatch(
               crudSuccess({
                  contacts: contactsArray
               })
            );
         })
         .catch((err) => {
            dispatch(crudFail(err.response.data.error));
         });
   }
);

export const postContact = createAsyncThunk(
   "crudRdc/postContact",
   async (requestParams, { dispatch }) => {
      dispatch(crudStart());
      let queryParams = '?auth=' + requestParams[1].token;
      const url =
         "https://adresar-dfb64-default-rtdb.europe-west1.firebasedatabase.app/adresar.json" + queryParams;
      axios(url, {
         method: requestParams[1].method,
         headers: {
            "Content-Type": "application/json",
         },
         data: requestParams[0],
      })
         .then((response) => {
            dispatch(crudSuccess({ contacts: response.data.contacts }));
            dispatch(getContacts({ token: requestParams[1].token, userId: requestParams[0].userId }));
         })
         .catch((err) => {
            dispatch(crudFail(err.response.data.error));
         });
   }
);

//deleting and updating contacts
export const patchContact = createAsyncThunk(
   "crudRdc/patchContact",
   async (requestParams, { dispatch }) => {

      dispatch(crudStart());
      let queryParams = "/" + requestParams.key + ".json" + '?auth=' + requestParams.token;
      const url =
         "https://adresar-dfb64-default-rtdb.europe-west1.firebasedatabase.app/adresar" + queryParams;

      axios(url, {
         method: requestParams.method,
         headers: {
            "Content-Type": "application/json",
         },
         data: requestParams,
      })
         .then((response) => {
            dispatch(getContacts({ token: requestParams.token, userId: requestParams.userId })
            );
         })
         .catch((err) => {
            console.log(err)
            dispatch(crudFail(err.message));
         });
   }
);

const crudSlice = createSlice({
   name: "crudRdc",
   initialState,
   reducers: {
      crudStart: (state) => {
         state.isLoadin = true;
         state.responseError = null;
      },
      crudSuccess: (state, action) => {
         state.contacts = action.payload.contacts;
         state.responseError = null;
         state.isLoadin = false;
      },
      crudFail: (state, action) => {
         state.responseError = action.payload.message;
         state.isLoadin = false;
      },
      updateContacts: (state, action) => {
         state.contacts = action.payload.contacts;
      }
   }
})

export const {
   crudStart,
   crudSuccess,
   crudFail,
   updateContacts,
} = crudSlice.actions;

export default crudSlice.reducer;