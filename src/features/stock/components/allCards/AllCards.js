import React, { useState } from "react";
import { CardTitle, CardsWrapper } from "../commonStyles/allCardsStyles";
import Card from "./Card";
import { useSelector } from "react-redux";
import { IconHeaderWrapper, ActionIcon } from "../commonStyles/commonStyles";

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

  const allStocks = Object.keys(livePlusIndicator);
  return (
    <div className="App">
      <hr />
      <IconHeaderWrapper onClick={handleClick}>
        <ActionIcon>{isOpen ? "-" : "+"}</ActionIcon>
        <CardTitle>All Stocks - {allStocks.length}</CardTitle>
      </IconHeaderWrapper>

      {isOpen && (
        <CardsWrapper>
          {allStocks.map((stockName, index) => {
            return (
              <Card
                card={livePlusIndicator[stockName]}
                stockName={stockName}
                key={index}
                chartData={chartData[stockName]}
                rsiData={allRSIData[stockName]}
              />
            );
          })}
        </CardsWrapper>
      )}
      <hr />
    </div>
  );
}

export default AllCards;
