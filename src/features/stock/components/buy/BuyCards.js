import React from "react";
import { CardTitle, CardsWrapper } from "../commonStyles/allCardsStyles";
import BuyCard from "./BuyCard";
import { getBuyRecommendations } from "../../services/buyService";
import { useSelector } from "react-redux";
import { selectLivePlusIndicatorData, selectTradeData } from "../../StockSlice";

const limit10Percentage = -10;
const limit5Percentage = -5;

function BuyCards() {
  const livePlusIndicator = useSelector(selectLivePlusIndicatorData);
  const tradeData = useSelector(selectTradeData);
  const cards10Percentage = getBuyRecommendations(
    livePlusIndicator,
    tradeData,
    limit10Percentage
  );

  const cards5Percentage = getBuyRecommendations(
    livePlusIndicator,
    tradeData,
    limit5Percentage
  );

  return (
    <div className="App">
      <CardTitle>Buy Cards 10% - {cards10Percentage.length}</CardTitle>
      <CardsWrapper>
        {cards10Percentage.map((card, index) => {
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

      <CardTitle>Buy Cards 5% - {cards5Percentage.length}</CardTitle>
      <CardsWrapper>
        {cards5Percentage.map((card, index) => {
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
