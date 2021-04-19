import React from "react";
import { CardTitle, CardsWrapper } from "../commonStyles/allCardsStyles";
import BuyCard from "./BuyCard";
import { getBuyRecommendations } from "../../services/buyService";
import { useSelector } from "react-redux";
import { selectLivePlusIndicatorData, selectTradeData } from "../../StockSlice";

function BuyCards() {
  const livePlusIndicator = useSelector(selectLivePlusIndicatorData);
  const tradeData = useSelector(selectTradeData);
  const cards = getBuyRecommendations(livePlusIndicator, tradeData);
  return (
    <div className="App">
      <CardTitle>Buy Cards - {cards.length}</CardTitle>
      <CardsWrapper>
        {cards.map((card, index) => {
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

export default BuyCards;
