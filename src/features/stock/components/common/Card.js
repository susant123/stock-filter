import React, { useState } from "react";
import { CardBlock } from "../commonStyles/cardStyles";
import { IconHeaderWrapper, ActionIcon } from "../commonStyles/commonStyles";
import { CardTitle, CardContainer } from "../commonStyles/allCardsStyles";
import CommonCardView from "../common/CommonCardView";
import ChartsAndDetails from "../common/ChartsAndDetails";

function Card(props) {
  const {
    card,
    stockName,
    chartData,
    rsiData,
    keepSeparated,
    nsePriceData,
    currentIndex,
  } = props;
  //console.log("currentIndex", currentIndex);
  const [isOpen, setIsOpen] = useState(currentIndex > 41 ? false : true);
  const { nse } = card;

  const marketCap = Math.floor(
    (card.nse.securityInfo.issuedCap * card.nse.priceInfo.lastPrice) / 10000000
  );

  /*   const isLowRSI = (rsiData) => {
    let total = 0;
    for (let i = 0; i < rsiData.length; i++) {
      total += rsiData[i];
    }
    const average = total / rsiData.length;
    if (average > rsiData[rsiData.length - 1]) {
      return true;
    }
  };
 */

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  //const isLowRsi = isLowRSI(rsiData);

  //console.log("stockName", stockName);
  return (
    <CardContainer keepSeparated={keepSeparated} isOpen={isOpen}>
      <IconHeaderWrapper onClick={handleClick}>
        <ActionIcon>{isOpen ? "-" : "+"}</ActionIcon>
        <CardTitle>
          {stockName}-({nse.priceInfo.lastPrice}) ({marketCap} Cr)
        </CardTitle>
      </IconHeaderWrapper>

      {isOpen && (
        <CardBlock>
          <CommonCardView
            nseData={nse}
            stockName={stockName}
            nsePriceData={nsePriceData}
          />
          <ChartsAndDetails
            card={card}
            rsiData={rsiData}
            chartData={chartData}
            stockName={stockName}
          />
        </CardBlock>
      )}
    </CardContainer>
  );
}

export default Card;
