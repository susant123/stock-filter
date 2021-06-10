import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AllCards from "./components/allCards/AllCards";
import {
  getLivePlusIndicatorDataAsync,
  getAllRSIDataAsync,
  getChartDataAsync,
  getTradeDataAsync,
  selectLivePlusIndicatorData,
  updateStock,
} from "./StockSlice";
import SellCards from "../stock/components/sell/SellCards";
import BuyCards from "../stock/components/buy/BuyCards";
import Portfolio from "../stock/components/portfolio/portfolio";
import InsertNewData from "./components/dataManage/insertData";
import Tabs from "./Tabs";

export function Stock() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLivePlusIndicatorDataAsync());
    dispatch(getAllRSIDataAsync());
    dispatch(getChartDataAsync());
    dispatch(getTradeDataAsync());
  }, [dispatch]);
  const livePlusIndicatorData = useSelector(selectLivePlusIndicatorData);

  return (
    <div className="App" style={{ fontFamily: "sans-serif", fontSize: "16px" }}>
      <Tabs />
      <InsertNewData />
      <Portfolio />
      <SellCards />
      <BuyCards />
      <AllCards livePlusIndicator={livePlusIndicatorData} />
    </div>
  );
}
