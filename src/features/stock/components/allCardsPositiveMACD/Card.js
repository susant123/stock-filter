import React, { useState } from "react";
import { CardBlock, StockSymbol, StockName } from "../commonStyles/cardStyles";
import PivotLevelsTable from "../indicators/PivotLevelsTable";
import SentimentsTable from "../indicators/SentimentsTable";
import EmaSma from "../indicators/EmaSma";
import SwotComponent from "../indicators/SwotComponent";
import VolumeData from "../indicators/VolumeData";
import LineChart from "../charts/LineChart";
import MCChart from "../modal/MCChart";
import RSILineChart from "../rsiChart/RSILineChart";
import { IconHeaderWrapper, ActionIcon } from "../commonStyles/commonStyles";
import { CardTitle, CardsWrapper, CardContainer } from "../commonStyles/allCardsStyles";
import MACDChart from "../macdCharts/LineChart";

function Card(props) {
  const { card, stockName, chartData, rsiData, keepSeparated} = props;
  const [isOpen, setIsOpen] = useState(true);
  const {
    indicators,
    strength,
    weakness,
    opportunities,
    threat,
    volumeData,
    nse,
  } = card;

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

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const isLowRsi = isLowRSI(rsiData);
  //console.log("isLowRsi-----------------", isLowRsi);
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
          <StockSymbol>
            {stockName}-({nse.priceInfo.lastPrice})
          </StockSymbol>
          <hr style={{ borderColor: "gray" }} />
          <StockName>
            {nse.info.companyName}-({nse.metadata.industry.toLowerCase()})
          </StockName>
          <hr />
          <MCChart stockName={stockName} />
          <SentimentsTable sentiments={indicators.sentiments} />
          <PivotLevelsTable pivotLevels={indicators.pivotLevels} />
          <EmaSma ema={indicators.ema} sma={indicators.sma} />
          <hr />
          <div style={{ backgroundColor: "#b49292" }}>
            <SwotComponent swot={strength} />
            <hr />
            <SwotComponent swot={weakness} />
            <hr />
            <SwotComponent swot={opportunities} />
            <hr />
            <SwotComponent swot={threat} />
            <hr />
            <VolumeData volumeData={volumeData} />
            <hr />
            <LineChart chartData={chartData} />
            <hr />
            <RSILineChart
              chartData={chartData ? chartData : {}}
              rsiData={rsiData}
              rsiRange={14}
              isLowRsi={isLowRsi}
            />
            <MACDChart
              macdChartData = {card.macdData} />
          </div>
        </CardBlock>
      )}
    </CardContainer>
  );
}

export default Card;
