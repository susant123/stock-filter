import { configureStore } from "@reduxjs/toolkit";
import stockReducer from "../features/stock/StockSlice";

export const store = configureStore({
  reducer: {
    stocks: stockReducer,
  },
});
