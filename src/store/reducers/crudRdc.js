import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
   contacts: null,
   responseError: null,
   isLoadin: null,
};

export const getContacts = createAsyncThunk(
   "crudRdc",
   async (requestParams, { dispatch }) => {
      console.log("getcontact: ", requestParams)
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
            console.log(response.data);
            let contactsArray = [];

            for (let key in response.data) {
               if (response.data[key].isFavorite === "false") {
                  response.data[key].isFavorite = false;
               } else {
                  response.data[key].isFavorite = true;
               }
               contactsArray.push(response.data[key]);
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
   "crudRdc",
   async (requestParams, { dispatch }) => {
      dispatch(crudStart());
      let queryParams = '?auth=' + requestParams[1].token;
      if (requestParams.method === "delete") {
         queryParams = queryParams + requestParams.id + ".json";
      }
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
   "crudRdc",
   async (requestParams, { dispatch }) => {

      dispatch(crudStart());

      let queryParams = '?auth=' + requestParams[0].token + "/" + requestParams[0].id + "/.json";
      console.log("query-params-patch ", queryParams)
      const url =
         "https://adresar-dfb64-default-rtdb.europe-west1.firebasedatabase.app/adresar.json" + queryParams;
      console.log(url)
      axios(url, {
         method: requestParams.method,
         headers: {
            "Content-Type": "application/json",
         },
         data: { isFavorite: requestParams.isFavorite },
      })
         .then((response) => {
            dispatch(getContacts({ token: requestParams.token, userId: requestParams.userId })
            );
         })
         .catch((err) => {
            dispatch(crudFail(err.response.data.error));
         });
   }
);

export const deleteContact = createAsyncThunk(
   "crudRdc",
   async (requestParams, { dispatch }) => {
      dispatch(crudStart());
      let queryParams = '?auth=' + requestParams[0].token + "/" + requestParams[0].id + ".json";
      const url =
         "https://adresar-dfb64-default-rtdb.europe-west1.firebasedatabase.app/adresar.json" + queryParams;
      axios(url, {
         method: "delete",
         headers: {
            "Content-Type": "application/json",
         },
      })
         .then((response) => {
            dispatch(getContacts({ token: requestParams[0].token, id: requestParams[0].userId })
            );
         })
         .catch((err) => {
            dispatch(crudFail(err.response.data.error));
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
   }
})

export const {
   crudStart,
   crudSuccess,
   crudFail,
} = crudSlice.actions;

export default crudSlice.reducer;