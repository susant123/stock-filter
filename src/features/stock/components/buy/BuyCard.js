import React from "react";
import {
  CardBlock,
  StockSymbol,
  GridBody,
  GridAction,
  AccuntName,
  QuantityBlock,
  Title,
  InputField,
  Button,
  StockName,
} from "../commonStyles/cardStyles";
import PivotLevelsTable from "../indicators/PivotLevelsTable";
import SentimentsTable from "../indicators/SentimentsTable";
import EmaSma from "../indicators/EmaSma";
import SwotComponent from "../indicators/SwotComponent";
import VolumeData from "../indicators/VolumeData";
import MCChart from "../modal/MCChart";
import RSILineChart from "../rsiChart/RSILineChart";
import { selectAllRSIData, selectChartData } from "../../StockSlice";
import { useSelector } from "react-redux";

const recommendedAmout = 15000;

function BuyCard(props) {
  const { card, nseData } = props;
  const { priceInfo, info, metadata } = nseData;
  const allRSIData = useSelector(selectAllRSIData);
  const chartData = useSelector(selectChartData);

  const recommendedQuantity = Math.floor(
    recommendedAmout / priceInfo.lastPrice
  );
  const displayRows = [
    { label: "Buy", info: card.account },
    { label: "Flag Accounts", info: card.flagAccounts },
    {
      label: "Year low",
      info: priceInfo.weekHighLow.min + " - " + priceInfo.weekHighLow.minDate,
    },
    {
      label: "Year high",
      info: priceInfo.weekHighLow.max + " - " + priceInfo.weekHighLow.maxDate,
    },
    {
      label: "IntraDay Range",
      info:
        priceInfo.intraDayHighLow.min + " - " + priceInfo.intraDayHighLow.max,
    },
  ];

  const chartDataPerStock = chartData[card.stockName] || [];

  return (
    <CardBlock>
      <StockSymbol>
        {card.stockName} ({priceInfo.lastPrice})
      </StockSymbol>
      <StockName>
        {info.companyName}-(
        {metadata.industry.toLowerCase()})
      </StockName>
      <hr style={{ borderColor: "gray" }} />

      {displayRows.map((displayRow, index) => {
        return (
          <GridBody key={index}>
            <GridAction>{displayRow.label}</GridAction>
            <AccuntName>{displayRow.info}</AccuntName>
          </GridBody>
        );
      })}
      <MCChart stockName={card.stockName} />
      <SentimentsTable sentiments={card.indicators.sentiments} />
      <PivotLevelsTable pivotLevels={card.indicators.pivotLevels} />
      <EmaSma ema={card.indicators.ema} sma={card.indicators.sma} />
      <hr />
      <div style={{ backgroundColor: "#b49292" }}>
        <SwotComponent swot={card.strength} />
        <hr />
        <SwotComponent swot={card.weakness} />
        <hr />
        <SwotComponent swot={card.opportunities} />
        <hr />
        <SwotComponent swot={card.threat} />
        <hr />
        <VolumeData volumeData={card.volumeData} />
        <hr />
        <RSILineChart
          chartData={chartDataPerStock}
          rsiData={allRSIData[card.stockName]}
          rsiRange={14}
        />
      </div>
      <QuantityBlock>
        <Title>Recommended Quantity: {card.quantity}</Title>
        <InputField value={recommendedQuantity} onChange={() => {}} />
        <Button>Done</Button>
      </QuantityBlock>
    </CardBlock>
  );
}

export default BuyCard;
