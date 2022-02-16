import React from "react";
import { CardsWrapper } from "../commonStyles/allCardsStyles";
import { CardTitle } from "../commonStyles/allCardsStyles";
import SellCard from "./SellCard";
import { getSellRecommendation } from "../../services/sellService";
import { selectLivePlusIndicatorData, selectTradeData } from "../../StockSlice";
import { useSelector } from "react-redux";

function SellCards() {
  const livePlusIndicator = useSelector(selectLivePlusIndicatorData);
  const tradeData = useSelector(selectTradeData);
  const cards = getSellRecommendation(livePlusIndicator, tradeData);

  return (
    <div className="App">
      <CardTitle>
        Sell Card - {cards.length}
        <CardsWrapper>
          {cards.map((card, index) => {
            return <SellCard card={card} key={index} />;
          })}
        </CardsWrapper>
      </CardTitle>

      <hr />
    </div>
  );
}

export default SellCards;
