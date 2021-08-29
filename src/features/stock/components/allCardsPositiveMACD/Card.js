import React, { useState } from "react";
import { CardBlock } from "../commonStyles/cardStyles";
import { IconHeaderWrapper, ActionIcon } from "../commonStyles/commonStyles";
import { CardTitle, CardContainer } from "../commonStyles/allCardsStyles";
import CommonCardView from "../common/CommonCardView";
import ChartsAndDetails from "../common/ChartsAndDetails";

function Card(props) {
  const { card, stockName, chartData, rsiData, keepSeparated } = props;
  const [isOpen, setIsOpen] = useState(true);
  const { nse } = card;

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <CardContainer keepSeparated={keepSeparated} isOpen={isOpen}>
      <IconHeaderWrapper onClick={handleClick}>
        <ActionIcon>{isOpen ? "-" : "+"}</ActionIcon>
        <CardTitle>
          {stockName}-({nse.priceInfo.lastPrice}){" "}
        </CardTitle>
      </IconHeaderWrapper>

      {isOpen && stockName !== "ZEEL" && (
        <CardBlock>
          <CommonCardView nseData={nse} stockName={stockName} />
          <ChartsAndDetails
            card={card}
            rsiData={rsiData}
            chartData={chartData}
          />
        </CardBlock>
      )}
    </CardContainer>
  );
}

export default Card;
