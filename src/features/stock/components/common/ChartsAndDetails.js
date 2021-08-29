import React from "react";
import SwotComponent from "../indicators/SwotComponent";
import VolumeData from "../indicators/VolumeData";
import LineChart from "../charts/LineChart";
import RSILineChart from "../rsiChart/RSILineChart";
import MACDChart from "../macdCharts/LineChart";
import PivotLevelsTable from "../indicators/PivotLevelsTable";
import SentimentsTable from "../indicators/SentimentsTable";
import EmaSma from "../indicators/EmaSma";
import MCChart from "../modal/MCChart";

function ChartsAndDetails(props) {
  const { card, chartData, rsiData, stockName } = props;

  const { strength, weakness, opportunities, threat, volumeData, indicators } =
    card;

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

  const isLowRsi = isLowRSI(rsiData);

  return (
    <>
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
        <MACDChart macdChartData={card.macdData} />
      </div>
    </>
  );
}

export default ChartsAndDetails;
