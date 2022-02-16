import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getLivePlusIndicatorDataAsync,
  getAllRSIDataAsync,
  getChartDataAsync,
  getTradeDataAsync,
  selectLivePlusIndicatorData,
  getNSEPriceDataAsync,
} from "./StockSlice";
import Tabs from "./Tabs";

export function Stock() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLivePlusIndicatorDataAsync());
    dispatch(getAllRSIDataAsync());
    dispatch(getChartDataAsync());
    dispatch(getTradeDataAsync());
    dispatch(getNSEPriceDataAsync());
  }, [dispatch]);

  const livePlusIndicatorData = useSelector(selectLivePlusIndicatorData);

  return (
    <div className="App" style={{ fontFamily: "sans-serif", fontSize: "16px" }}>
      <Tabs livePlusIndicatorData={livePlusIndicatorData} />
    </div>
  );
}
