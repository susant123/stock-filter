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
  AdditionalInfo,
  Modal,
  ModalContent,
  CloseButton,
} from "./allPortfolio.styles";

function AllPortfolios() {
  const accounts = ["asha-kite", "susant-kite", "asha-angel", "susant-angel"];
  const tradeData = useSelector(selectTradeData);
  /*const [selectedAc, setSelectedAc] = useState(null);
  const [totalInvested, setTotalInvested] = useState(0);*/
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStock, setModalStock] = useState(null);
  const livePlusIndicator = useSelector(selectLivePlusIndicatorData);
  const allStocks = Object.keys(livePlusIndicator);

  allStocks.sort();

  //console.log("allStocks", allStocks);

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

  const showAdditionalInfoModal = (stock) => {
    setIsModalOpen(true);
    setModalStock(keyObjectTradeData[accounts[0]][stock]);
    console.log(keyObjectTradeData[accounts[0]][stock]);
    //keyObjectTradeData[account][stock]
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="portfolio">
      <PortfolioTable>
        <Row fixedRow={true}>
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
        {allStocks.map((stock, index) => {
          if (stock !== "TIMESTAMP") {
            return (
              <Row key={index}>
                <Col isHeader={true}>
                  {stock}
                  <AdditionalInfo
                    onClick={() => showAdditionalInfoModal(stock)}
                  >
                    +
                  </AdditionalInfo>
                </Col>

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
                    <Col key={index}>
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
          } else {
            return null;
          }
        })}
      </PortfolioTable>
      {isModalOpen && (
        <Modal>
          <CloseButton onClick={closeModal}>X</CloseButton>
          <ModalContent>{modalStock.stock_name}</ModalContent>
        </Modal>
      )}
    </div>
  );
}

export default AllPortfolios;
