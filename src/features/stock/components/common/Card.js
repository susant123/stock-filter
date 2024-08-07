import React, { useState } from "react";
import { CardBlock } from "../commonStyles/cardStyles";
import { IconHeaderWrapper, ActionIcon } from "../commonStyles/commonStyles";
import {
  CardTitle,
  CardContainer,
  IfBought,
} from "../commonStyles/allCardsStyles";
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
    boughtData,
  } = props;
  //console.log("currentIndex", currentIndex);
  const [isOpen, setIsOpen] = useState(currentIndex > 41 ? false : true);
  const { nse } = card;

  const marketCap =
    nse.securityInfo && nse.securityInfo.issuedSize
      ? Math.floor(
          (parseInt(nse.securityInfo.issuedSize, 10) *
            nse.priceInfo.lastPrice) /
            10000000
        )
      : "Not known";

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const lastPrice = nse.priceInfo ? nse.priceInfo.lastPrice : "Not known";
  return (
    <CardContainer keepSeparated={keepSeparated} isOpen={isOpen}>
      <IconHeaderWrapper onClick={handleClick}>
        <ActionIcon>{isOpen ? "-" : "+"}</ActionIcon>
        <CardTitle>
          {stockName}-({lastPrice}) ({marketCap} Cr)
        </CardTitle>
      </IconHeaderWrapper>
      {isOpen && (
        <CardBlock>
          <CommonCardView
            nseData={nse}
            stockName={stockName}
            nsePriceData={nsePriceData}
          />
          <IfBought>
            {boughtData &&
              boughtData.length > 0 &&
              boughtData.map(
                (data) =>
                  data.account +
                  ":" +
                  parseFloat(
                    ((lastPrice - data.average_price) / data.average_price) *
                      100
                  ).toFixed(2)
              )}
          </IfBought>

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
