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
               if (response.data[key].isFavorite === "false") {
                  response.data[key].isFavorite = false;
               } else {
                  response.data[key].isFavorite = true;
               }
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
            dispatch(
               crudSuccess({
                  contacts: response.data.contacts
               })
            );
         })
         .catch((err) => {
            dispatch(crudFail(err.response.data.error));
         });
   }
);

export const patchContact = createAsyncThunk(
   "crudRdc/patchContact",
   async (requestParams, { dispatch }) => {

      dispatch(crudStart());
      let queryParams = '?auth=' + requestParams.token + "/" + requestParams.id + "/.json";
      const url =
         "https://adresar-dfb64-default-rtdb.europe-west1.firebasedatabase.app/adresar" + queryParams;

      axios(url, {
         method: "PATCH",
         headers: {
            "Authorization": "Bearer " + requestParams.token,
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            "Access-Control-Allow-Methods": "DELETE, PATCH, PUT, POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
         },
         data: { isFavorite: requestParams.isFavorite },
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

//sending request without auth token = OK
export const deleteContact = createAsyncThunk(
   "crudRdc/deleteContact",
   async (requestParams, { dispatch }) => {
      dispatch(crudStart());
      let queryParams = "/" + requestParams.key + ".json";
      const url =
         "https://adresar-dfb64-default-rtdb.europe-west1.firebasedatabase.app/adresar" + queryParams;

      axios(url, {
         method: "DELETE",
         headers: {
            "Content-Type": "application/json",
         },
      })
         .then((response) => {
            dispatch(getContacts({ token: requestParams.token, id: requestParams.id })
            );
         })
         .catch((err) => {
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
