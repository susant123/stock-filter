import React, { useState } from "react";
import { selectTradeData } from "../../StockSlice";
import { useSelector } from "react-redux";
import { selectLivePlusIndicatorData } from "../../StockSlice";
import { convertArrayToObject } from "../../utils/utilities";

import {
  PortfolioTable,
  Col,
  Row,
  InnerRow,
  InnerCol,
} from "./allPortfolio.styles";

function AllPortfolios() {
  const accounts = ["asha-kite", "susant-kite", "asha-angel", "susant-angel"];
  const tradeData = useSelector(selectTradeData);
  const [selectedAc, setSelectedAc] = useState(null);
  const [totalInvested, setTotalInvested] = useState(0);
  const livePlusIndicator = useSelector(selectLivePlusIndicatorData);

  const allStocks = Object.keys(livePlusIndicator);

  const getKeyObjectTradeData = (tradeData) => {
    const keyObjectTradeData = [];
    if (tradeData["asha-kite"] && tradeData[accounts[0]]) {
      for (let i = 0; i < accounts.length; i++) {
        keyObjectTradeData[accounts[i]] = convertArrayToObject(
          tradeData[accounts[i]],
          "stock_name"
        );
      }
    }
    return keyObjectTradeData;
  };

  const keyObjectTradeData = getKeyObjectTradeData(tradeData);

  return (
    <div className="portfolio">
      <PortfolioTable>
        <Row>
          <Col isHeader={true}>Stock Name</Col>
          <Col isHeader={true}>Asha Kite</Col>
          <Col isHeader={true}>Susant Kite</Col>
          <Col isHeader={true}>Asha Angel</Col>
          <Col isHeader={true}>Susant Angel</Col>
        </Row>
        <Row>
          <Col isHeader={true}></Col>
          <Col isHeader={true}>
            <InnerRow>
              <InnerCol>APrice</InnerCol>
              <InnerCol>Quantity</InnerCol>
              <InnerCol>CPrice</InnerCol>
              <InnerCol>P/L</InnerCol>
            </InnerRow>
          </Col>
          <Col isHeader={true}>
            <InnerRow>
              <InnerCol>APrice</InnerCol>
              <InnerCol>Quantity</InnerCol>
              <InnerCol>CPrice</InnerCol>
              <InnerCol>P/L</InnerCol>
            </InnerRow>
          </Col>
          <Col isHeader={true}>
            <InnerRow>
              <InnerCol>APrice</InnerCol>
              <InnerCol>Quantity</InnerCol>
              <InnerCol>CPrice</InnerCol>
              <InnerCol>P/L</InnerCol>
            </InnerRow>
          </Col>
          <Col isHeader={true}>
            <InnerRow>
              <InnerCol>APrice</InnerCol>
              <InnerCol>Quantity</InnerCol>
              <InnerCol>CPrice</InnerCol>
              <InnerCol>P/L</InnerCol>
            </InnerRow>
          </Col>
        </Row>
        {allStocks.map((stock) => {
          return (
            <Row>
              <Col isHeader={true}>{stock}</Col>

              {accounts.map((account, index) => {
                const averagePrice = keyObjectTradeData[account][stock]
                  ? keyObjectTradeData[account][stock].average_price
                  : null;
                const latestPrice =
                  livePlusIndicator[stock].nse.priceInfo.lastPrice;

                const profitLoss = averagePrice
                  ? (
                      ((latestPrice - averagePrice) / averagePrice) *
                      100
                    ).toFixed(1)
                  : null;
                const quantity = keyObjectTradeData[account][stock]
                  ? keyObjectTradeData[account][stock].quantity
                  : null;

                return (
                  <Col>
                    <InnerRow>
                      <InnerCol>{averagePrice}</InnerCol>
                      <InnerCol>{quantity}</InnerCol>
                      <InnerCol>
                        {quantity &&
                          keyObjectTradeData[account][stock] &&
                          latestPrice}
                      </InnerCol>
                      <InnerCol isLoss={profitLoss < 0} isHeader={true}>
                        {quantity && profitLoss}
                      </InnerCol>
                    </InnerRow>
                  </Col>
                );
              })}
            </Row>
          );
        })}
      </PortfolioTable>
    </div>
  );
}

export default AllPortfolios;
