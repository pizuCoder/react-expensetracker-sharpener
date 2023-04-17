import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./AuthReducer";
import expenseSlice from "./ExpReducer"

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  expenses: expenseSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;



