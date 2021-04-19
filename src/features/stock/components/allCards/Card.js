import React from "react";
import { CardBlock, StockSymbol, StockName } from "../commonStyles/cardStyles";
import PivotLevelsTable from "../indicators/PivotLevelsTable";
import SentimentsTable from "../indicators/SentimentsTable";
import EmaSma from "../indicators/EmaSma";
import SwotComponent from "../indicators/SwotComponent";
import VolumeData from "../indicators/VolumeData";
import LineChart from "../charts/LineChart";
import MCChart from "../modal/MCChart";
//import ChartData from "../../data/json/chart-6month.json";

import RSILineChart from "../rsiChart/RSILineChart";
//import AllRSIData from "../../data/json/AllRSIData.json";

function Card(props) {
  const { card, stockName, chartData, rsiData } = props;
  // console.log("card----", chartData);
  const {
    indicators,
    strength,
    weakness,
    opportunities,
    threat,
    volumeData,
    nse,
  } = card;

  console.log("stockName--", stockName);

  return (
    <>
      {stockName !== "ZEEL" && (
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
          <SentimentsTable sentiments={indicators.data.sentiments} />
          <PivotLevelsTable pivotLevels={indicators.data.pivotLevels} />
          <EmaSma ema={indicators.data.ema} sma={indicators.data.sma} />
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
            <VolumeData volumeData={volumeData.data} />
            <hr />
            <LineChart chartData={chartData.chartData} />
            <hr />
            <RSILineChart
              chartData={chartData.chartData}
              rsiData={rsiData}
              rsiRange={14}
            />
          </div>
        </CardBlock>
      )}
    </>
  );
}

export default Card;
