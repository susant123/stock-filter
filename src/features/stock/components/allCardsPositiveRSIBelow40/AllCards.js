import React, { useState } from "react";
import { CardTitle, CardsWrapper } from "../commonStyles/allCardsStyles";
import Card from "./Card";
import { useSelector } from "react-redux";
import { IconHeaderWrapper } from "../commonStyles/commonStyles";

import {
  selectAllRSIData,
  selectChartData,
  selectLivePlusIndicatorData,
} from "../../StockSlice";

function AllCards() {
  const [isOpen, setIsOpen] = useState(false);

  const allRSIData = useSelector(selectAllRSIData);
  const chartData = useSelector(selectChartData);
  const livePlusIndicator = useSelector(selectLivePlusIndicatorData);

  //console.log("livePlusIndicator", livePlusIndicator);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const isLowRSI = (rsiData) => {
    let total = 0;
    for (let i = 0; i < rsiData.length; i++) {
      total += rsiData[i];
    }
    const average = total / rsiData.length;
    /*if (average > rsiData[rsiData.length - 1]) {
      return true;
    }*/

    if (
      average > rsiData[rsiData.length - 1] &&
      rsiData[rsiData.length - 1] < 40
    ) {
      return true;
    }
  };

  const allStocks = Object.keys(livePlusIndicator);

  const allPositiveRSICount = allStocks.filter((stockName) => {
    return isLowRSI(allRSIData[stockName]);
  });

  return (
    <div className="App">
      <hr />
      <IconHeaderWrapper onClick={handleClick} allCards={true}>
        <CardTitle>Positive RSI - {allPositiveRSICount.length}</CardTitle>
      </IconHeaderWrapper>

      <CardsWrapper>
        {allStocks.map((stockName, index) => {
          const isLowRsi = isLowRSI(allRSIData[stockName]);
          if (isLowRsi) {
            return (
              <Card
                card={livePlusIndicator[stockName]}
                stockName={stockName}
                key={index}
                chartData={chartData[stockName]}
                rsiData={allRSIData[stockName]}
              />
            );
          } else {
            return <></>;
          }
        })}
      </CardsWrapper>
      <hr />
    </div>
  );
}

export default AllCards;
