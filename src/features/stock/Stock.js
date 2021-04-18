import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import AllCards from "./components/allCards/AllCards";

import {
  getLivePlusIndicatorData,
  getAllRSIDataAsync,
  getChartDataAsync,
  getTradeDataAsync,
  selectAllRSIData,
  selectChartData,
  selectLivePlusIndicatorData,
} from "./StockSlice";

export function Stock() {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("In useEffect");
    dispatch(getLivePlusIndicatorData());
    dispatch(getAllRSIDataAsync());
    dispatch(getChartDataAsync());
    dispatch(getTradeDataAsync());
  }, []);
  const allRSIData = useSelector(selectAllRSIData);
  const chartData = useSelector(selectChartData);
  const livePlusIndicatorData = useSelector(selectLivePlusIndicatorData);

  return (
    <div className="App" style={{ fontFamily: "sans-serif", fontSize: "16px" }}>
      <AllCards livePlusIndicator={livePlusIndicatorData} />
    </div>
  );
}
