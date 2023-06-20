import React, { useState } from 'react';
import { CardTitle, CardsWrapper } from '../commonStyles/allCardsStyles';
//import Card from "./Card";

import Card from '../common/Card';

import { useSelector } from 'react-redux';
import { IconHeaderWrapper } from '../commonStyles/commonStyles';

import {
  selectAllRSIData,
  selectChartData,
  selectLivePlusIndicatorData,
  selectNSEPriceData,
} from '../../StockSlice';

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

  const allStocks = Object.keys(livePlusIndicator);
  return (
    <div className="App">
      <hr />
      <IconHeaderWrapper onClick={handleClick} allCards={true}>
        <CardTitle>All Stocks - {allStocks.length}</CardTitle>
      </IconHeaderWrapper>

      <CardsWrapper>
        {allStocks.map((stockName, index) => {
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
        })}
      </CardsWrapper>
      <hr />
    </div>
  );
}

export default AllCards;
