import React, { useState } from "react";
import { selectTradeData } from "../../StockSlice";
import { useSelector } from "react-redux";
import {
  selectLivePlusIndicatorData,
  selectNSEPriceData,
} from "../../StockSlice";
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
  NotLive,
} from "./allPortfolio.styles";

const lowMarketCap = 7500;
const tooLowMarketCap  = 5000;

function AllPortfolios() {
  const accounts = ["asha-kite", "susant-kite", "asha-angel", "susant-angel", "susant-paytm", "susant-fyers",  "asha-paytm"];
  const tradeData = useSelector(selectTradeData);
  /*const [selectedAc, setSelectedAc] = useState(null);
  const [totalInvested, setTotalInvested] = useState(0);*/
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStock, setModalStock] = useState(null);
  const livePlusIndicator = useSelector(selectLivePlusIndicatorData);
  const nsePriceData = useSelector(selectNSEPriceData);
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

  const accountsData = [
    {
      acName: "asha-kite",
      label: "Asha Kite",
    },
    {
      acName: "susant-kite",
      label: "Susant Kite",
    },
    {
      acName: "asha-angel",
      label: "Asha Angel",
    },
    {
      acName: "susant-angel",
      label: "Susant Angel",
    },
    {
      acName: "susant-paytm",
      label: "Susant Paytm",
    },
    {
      acName: "susant-fyers",
      label: "Susant Fyers",
    },
    {
      acName: "asha-paytm",
      label: "Asha Paytm",
    },
  ];
  return (
    <div className="portfolio">
      <PortfolioTable>
        <Row fixedRow={true}>
          <Col isHeader={true}>Stock Name</Col>
          {accountsData.map((ac) => (
            <Col isHeader={true} key={ac.acName}>
              {ac.label}
            </Col>
          ))}
        </Row>
        <Row>
          <Col isHeader={true}></Col>

          {accountsData.map((ac) => (
            <Col isHeader={true} key={ac.acName}>
              <InnerRow>
                <InnerCol>APrice</InnerCol>
                <InnerCol>Qty</InnerCol>
                <InnerCol>CPrice</InnerCol>
                <InnerCol>P/L</InnerCol>
                <InnerCol>P/L B</InnerCol>
              </InnerRow>
            </Col>
          ))}
        </Row>
        {allStocks.map((stock, index) => {
            const marketCap = livePlusIndicator[stock].nse.securityInfo && livePlusIndicator[stock].nse.securityInfo.issuedSize ? Math.floor(
              (parseInt(livePlusIndicator[stock].nse.securityInfo.issuedSize, 10) * livePlusIndicator[stock].nse.priceInfo.lastPrice) / 10000000
            ): "Not known";

          if (stock !== "TIMESTAMP") {
            return (
              <Row key={index} isTooLow={marketCap < tooLowMarketCap} isLow={marketCap < lowMarketCap }>
                <Col isHeader={true}>
                  <b>{stock}</b>{" "}<span style={{color: "#999", fontStyle: "italic"}}>{marketCap}</span>
                  {nsePriceData[stock] ? null : <NotLive>NL</NotLive>}
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

                  //console.log("nsePriceData[stock]",stock, nsePriceData[stock],livePlusIndicator[stock]);

                  const latestPrice = nsePriceData[stock]
                    ? nsePriceData[stock].lastPrice
                    : livePlusIndicator[stock].nse.priceInfo
                    ? livePlusIndicator[stock].nse.priceInfo.lastPrice
                    : 1000;

                  const profitLoss = averagePrice
                    ? (
                        ((latestPrice - averagePrice) / averagePrice) *
                        100
                      ).toFixed(1)
                    : null;

                  const profitLossFromBottom = averagePrice
                    ? (
                        ((latestPrice - averagePrice) / latestPrice) *
                        100
                      ).toFixed(1)
                    : null;

                  const quantity = keyObjectTradeData[account][stock]
                    ? keyObjectTradeData[account][stock].quantity
                    : null;

                  return (
                    <Col key={index} isTooLow={marketCap < tooLowMarketCap} isLow={marketCap < lowMarketCap}>
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
                        <InnerCol
                          isLoss={profitLossFromBottom < 0}
                          isHeader={true}
                        >
                          {quantity && profitLossFromBottom}
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
