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

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const isLowRSI = (rsiData) => {
    let total = 0;
    for (let i = 0; i < rsiData.length; i++) {
      total += rsiData[i];
    }
    const average = total / rsiData.length;
    if (average > rsiData[rsiData.length - 1]) {
      return true;
    }
  };

  const allStocks = Object.keys(livePlusIndicator);

  const isPositiveMACDSignal = (macdChartData) => {
    if (macdChartData && macdChartData.length > 0) {
      const macd = macdChartData?.[0];
      const signal = macdChartData?.[1];
      return macd[macd.length - 1] >= signal[signal.length - 1];
    }
  };

  const allPositiveMACDCount = allStocks.filter((stockName) => {
    return (
      allRSIData[stockName] &&
      isLowRSI(allRSIData[stockName]) &&
      isPositiveMACDSignal(livePlusIndicator[stockName].macdData)
    );
  });

  return (
    <div className="App">
      <hr />
      <IconHeaderWrapper onClick={handleClick} allCards={true}>
        <CardTitle>
          Positive MACD & RSI - {allPositiveMACDCount.length}
        </CardTitle>
      </IconHeaderWrapper>

      <CardsWrapper>
        {allPositiveMACDCount.map((stockName, index) => (
          <Card
            card={livePlusIndicator[stockName]}
            stockName={stockName}
            key={index}
            currentIndex={index}
            chartData={chartData[stockName]}
            rsiData={allRSIData[stockName]}
            nsePriceData={nsePriceData[stockName]}
          />
        ))}
      </CardsWrapper>
      <hr />
    </div>
  );
}

export default AllCards;
