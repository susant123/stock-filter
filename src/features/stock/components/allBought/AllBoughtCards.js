import React from "react";
import { CardTitle, CardsWrapper } from "../commonStyles/allCardsStyles";
//import BuyCard from "./BuyCard";
import Card from "../common/Card";
import { getAllBoughtStocks } from "../../services/allBoughtService";
import { useSelector } from "react-redux";

import {
  selectAllRSIData,
  selectChartData,
  selectLivePlusIndicatorData,
  selectNSEPriceData,
  selectTradeData,
} from "../../StockSlice";

const limit5Percentage = 100;

function AllBoughtCards() {
  const livePlusIndicator = useSelector(selectLivePlusIndicatorData);
  const tradeData = useSelector(selectTradeData);

  const allRSIData = useSelector(selectAllRSIData);
  const chartData = useSelector(selectChartData);
  const nsePriceData = useSelector(selectNSEPriceData);

  const allBoughtStocks = getAllBoughtStocks(
    livePlusIndicator,
    tradeData,
    limit5Percentage
  );

  return (
    <div className="App">
      <CardTitle>All Bought cards- {allBoughtStocks.length}</CardTitle>
      <CardsWrapper>
        {allBoughtStocks.map((card, index) => {
          /* return (
            <BuyCard
              card={card}
              key={index}
              nseData={livePlusIndicator[card.stockName].nse}
            />
          ); */
          const stockName = card.stockName;

          return (
            <Card
              card={livePlusIndicator[stockName]}
              stockName={card.stockName}
              key={index}
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

export default AllBoughtCards;
