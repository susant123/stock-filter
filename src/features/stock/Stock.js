import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import AllCards from "./components/allCards/AllCards";

import {
  getLivePlusIndicatorDataAsync,
  getAllRSIDataAsync,
  getChartDataAsync,
  getTradeDataAsync,
  selectLivePlusIndicatorData,
} from "./StockSlice";
import SellCards from "../stock/components/sell/SellCards";
import BuyCards from "../stock/components/buy/BuyCards";

export function Stock() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("In useEffect");
    dispatch(getLivePlusIndicatorDataAsync());
    dispatch(getAllRSIDataAsync());
    dispatch(getChartDataAsync());
    dispatch(getTradeDataAsync());
  }, [dispatch]);
  //const allRSIData = useSelector(selectAllRSIData);
  //const chartData = useSelector(selectChartData);
  const livePlusIndicatorData = useSelector(selectLivePlusIndicatorData);

  return (
    <div className="App" style={{ fontFamily: "sans-serif", fontSize: "16px" }}>
      <SellCards />
      <BuyCards />
      <AllCards livePlusIndicator={livePlusIndicatorData} />
    </div>
  );
}
