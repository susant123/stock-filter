import React, { useState } from "react";
import { CardTitle, CardsWrapper } from "../commonStyles/allCardsStyles";
//import Card from "./Card";

import Card from "../common/Card";

import { useSelector } from "react-redux";
import { IconHeaderWrapper } from "../commonStyles/commonStyles";

import {
  selectAllRSIData,
  selectChartData,
  selectLivePlusIndicatorData,
  selectNSEPriceData,
} from "../../StockSlice";

function AllCards() {
  const [isOpen, setIsOpen] = useState(false);

  const allRSIData = useSelector(selectAllRSIData);
  const chartData = useSelector(selectChartData);
  const livePlusIndicator = useSelector(selectLivePlusIndicatorData);
  const nsePriceData = useSelector(selectNSEPriceData);

  //console.log("livePlusIndicator", livePlusIndicator);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  /*   const isLowRSI = (rsiData) => {
    let total = 0;
    for (let i = 0; i < rsiData.length; i++) {
      total += rsiData[i];
    }
    const average = total / rsiData.length;
    if (average > rsiData[rsiData.length - 1]) {
      return true;
    }
  }; */

  const allStocks = Object.keys(livePlusIndicator);
  return (
    <div className="App">
      <hr />
      <IconHeaderWrapper onClick={handleClick} allCards={true}>
        <CardTitle>All Stocks - {allStocks.length}</CardTitle>
      </IconHeaderWrapper>

      <CardsWrapper>
        {allStocks.map((stockName, index) => {
          //const isLowRsi = isLowRSI(allRSIData[stockName]);
          //if (isLowRsi) {
          return (
            <Card
              card={livePlusIndicator[stockName]}
              stockName={stockName}
              key={index}
              currentIndex={index}
              chartData={chartData[stockName]}
              rsiData={allRSIData[stockName]}
              nsePriceData={nsePriceData[stockName]}
            />
          );
          //}
        })}
      </CardsWrapper>

      {/* <CardsWrapper>
        {allStocks.map((stockName, index) => {
          const isLowRsi = isLowRSI(allRSIData[stockName]);
          if (!isLowRsi) {
            return (
              <Card
                card={livePlusIndicator[stockName]}
                stockName={stockName}
                key={index}
                chartData={chartData[stockName]}
                rsiData={allRSIData[stockName]}
                keepSeparated={true}
                nsePriceData={nsePriceData[stockName]}
              />
            );
          }
        })}
      </CardsWrapper> */}
      <hr />
    </div>
  );
}

export default AllCards;
