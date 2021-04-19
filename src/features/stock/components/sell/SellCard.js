import React from "react";
import {
  SellCardBlock,
  StockSymbol,
  GridBody,
  GridAction,
  AccuntName,
  QuantityBlock,
  InputField,
  Button,
  Label,
  RowWrapper,
} from "../commonStyles/cardStyles";
import RSILineChart from "../rsiChart/RSILineChart";
import { selectAllRSIData, selectChartData } from "../../StockSlice";
import { useSelector } from "react-redux";

function SellCard(props) {
  const allRSIData = useSelector(selectAllRSIData);
  const chartData = useSelector(selectChartData);
  const card = props.card;
  const chartDataPerStock = chartData[card.stockName]
    ? chartData[card.stockName].chartData
    : [];
  return (
    <div className="App">
      <SellCardBlock>
        <StockSymbol>{card.stockName}</StockSymbol>
        <hr style={{ borderColor: "gray" }} />
        <GridBody>
          <GridAction>Sell Ac.</GridAction>
          <AccuntName>{card.account}</AccuntName>
        </GridBody>
        <GridBody>
          <GridAction>Buy Ac.</GridAction>
          <AccuntName>{card.account}</AccuntName>
        </GridBody>
        <GridBody>
          <GridAction>Profit</GridAction>
          <AccuntName>{card.profit}</AccuntName>
        </GridBody>
        <QuantityBlock>
          <RowWrapper>
            <Label>Quantity:</Label>{" "}
            <InputField value={card.quantity} onChange={() => {}} />
          </RowWrapper>

          <RowWrapper>
            <Label>Price:</Label>{" "}
            <InputField value={card.currentPrice} onChange={() => {}} />
          </RowWrapper>

          <RSILineChart
            chartData={chartDataPerStock}
            rsiData={allRSIData[card.stockName]}
            rsiRange={14}
          />
          <Button>Done</Button>
        </QuantityBlock>
      </SellCardBlock>
      <hr />
    </div>
  );
}

export default SellCard;
