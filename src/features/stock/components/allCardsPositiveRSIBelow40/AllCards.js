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

  const isLowRSI = (rsiData) => {
    if (!rsiData) {
      return false;
    }
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
      rsiData[rsiData.length - 1] < 35
    ) {
      return true;
    }
  };

  const allStocks = Object.keys(livePlusIndicator);

  const allPositiveRSICount = allStocks.filter((stockName) => {
    return isLowRSI(allRSIData[stockName]);
  });

  let cardNumber = 0;
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
            // console.log({ stockName, rsiData: allRSIData[stockName] });
            return (
              <Card
                card={livePlusIndicator[stockName]}
                stockName={stockName}
                key={index}
                currentIndex={cardNumber++}
                chartData={chartData[stockName]}
                rsiData={allRSIData[stockName]}
                nsePriceData={nsePriceData[stockName]}
                isLowRsi={isLowRsi}
              />
            );
          }
          return null;
        })}
      </CardsWrapper>
      <hr />
    </div>
  );
}

export default AllCards;
