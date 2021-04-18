import React, { useState, useEffect } from "react";
import Firebase from "firebase";
import config from "../../config.js";
import {
  GridContainer,
  GridRow,
  DataWrapper,
  HeaderWrapper,
  OwnerHeader,
} from "./StockData.styles";
import liveStock from "../../data/json/livePlusIndicator.json";
import { companies } from "../../constants/master";
import tradeData from "../../data/tradeData.json";
import { getKeyObjectTradeData } from "../../services/services";

function AllStockData() {
  const [stockData, setStockData] = useState([]);
  let keyObjectTradeData = {};
  useEffect(() => {
    if (!Firebase.apps.length) {
      Firebase.initializeApp(config);
    }
    //getStockData();
    keyObjectTradeData = getKeyObjectTradeData();

    //test();
    //writeStockData();
    setStockData(tradeData);
  }, []);

  //get Stock Data from Firebase
  /*const getStockData = () => {
    const fbObjct = Firebase.database().ref("/");
    fbObjct.on("value", (snapshot) => {
      const state = snapshot.val();
      console.log("state", state);
      setStockData(state);
    });
  };*/

  const writeStockData = () => {
    Firebase.database().ref("/").set(tradeData);
    console.log("DATA SAVED");
  };

  const accounts = ["asha-kite", "susant-kite", "asha-angel", "susant-angel"];

  const profitLossCalc = (currentPrice = 0, boughtPrice) => {
    return boughtPrice
      ? (((currentPrice - boughtPrice) / boughtPrice) * 100).toFixed(1)
      : 0;
  };

  return (
    <>
      {stockData.stocks &&
        accounts.map((account, index) => {
          return (
            <div key={index}>
              <OwnerHeader>Stock Data - {account}</OwnerHeader>
              <GridContainer>
                <GridRow>
                  <HeaderWrapper>Stock Symbol</HeaderWrapper>
                  <HeaderWrapper>Bought Price</HeaderWrapper>
                  <HeaderWrapper>Quantity</HeaderWrapper>
                  <HeaderWrapper>Current Price</HeaderWrapper>
                  <HeaderWrapper>Profit/Loss</HeaderWrapper>
                </GridRow>
                {stockData.stocks[account].map((value, index) => {
                  return (
                    <GridRow key={index}>
                      <DataWrapper>{value.stockName}</DataWrapper>
                      <DataWrapper>{value.boughtPrice}</DataWrapper>
                      <DataWrapper>{value.quantity}</DataWrapper>
                      <DataWrapper>{value.currentPrice}</DataWrapper>
                      <DataWrapper>
                        {profitLossCalc(value.currentPrice, value.boughtPrice)}
                      </DataWrapper>
                    </GridRow>
                  );
                })}
              </GridContainer>
            </div>
          );
        })}
    </>
  );
}

export default AllStockData;
