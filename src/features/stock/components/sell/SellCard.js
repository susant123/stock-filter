import React, { useState } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { updateStock } from "../../StockSlice";

function SellCard(props) {
  const dispatch = useDispatch();
  const allRSIData = useSelector(selectAllRSIData);
  const chartData = useSelector(selectChartData);
  const card = props.card;
  const chartDataPerStock = chartData[card.stockName]
    ? chartData[card.stockName].chartData
    : [];

  const [sellQuantity, setSellQuantity] = useState(card.quantity);
  const [sellPrice, setSellPrice] = useState(card.currentPrice);

  const doneHandler = () => {
    setSellQuantity(0);
    setSellPrice(0);

    dispatch(
      updateStock({
        stockName: card.stockName,
        account: card.account,
        quantity: null,
        price: null,
      })
    );
  };

  const partiallySavedhandler = () => {
    console.log(sellQuantity, ",", sellPrice);
    dispatch(
      updateStock({
        stockName: card.stockName,
        account: card.account,
        quantity: sellQuantity,
        price: sellPrice,
      })
    );
  };
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
            <InputField
              value={sellQuantity}
              onChange={(e) => {
                setSellQuantity(e.target.value);
              }}
            />
          </RowWrapper>

          <RowWrapper>
            <Label>Price:</Label>{" "}
            <InputField
              value={sellPrice}
              onChange={(e) => {
                setSellPrice(e.target.value);
              }}
            />
          </RowWrapper>

          {/* <RSILineChart
            chartData={chartDataPerStock}
            rsiData={allRSIData[card.stockName]}
            rsiRange={14}
          /> */}
          <Button onClick={doneHandler}>All Sold</Button>
          <Button onClick={partiallySavedhandler}>Partially Sold</Button>
        </QuantityBlock>
      </SellCardBlock>
      <hr />
    </div>
  );
}

export default SellCard;
