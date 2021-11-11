import React from "react";
import { CardTitle, CardsWrapper } from "../commonStyles/allCardsStyles";
import BuyCard from "./BuyCard";
import { getAllBoughtStocks } from "../../services/allBoughtService";
import { useSelector } from "react-redux";
import { selectLivePlusIndicatorData, selectTradeData } from "../../StockSlice";

const limit5Percentage = 100;

function AllBoughtCards() {
  const livePlusIndicator = useSelector(selectLivePlusIndicatorData);
  const tradeData = useSelector(selectTradeData);

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
          return (
            <BuyCard
              card={card}
              key={index}
              nseData={livePlusIndicator[card.stockName].nse}
            />
          );
        })}
      </CardsWrapper>
      <hr />
    </div>
  );
}

export default AllBoughtCards;
