import { configureStore, combineReducers } from "@reduxjs/toolkit";
import CrudReducer from "./reducers/crudRdc";
import AuthReducer from "./reducers/authRdc";

const rootReducer = combineReducers({
  authRdc: AuthReducer,
  crudRdc: CrudReducer,
});

export const store = configureStore({
  reducer: {
    rootRdc: rootReducer,
  },
});