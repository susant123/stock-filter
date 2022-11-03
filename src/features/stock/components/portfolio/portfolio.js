import React, { useState, useEffect } from "react";
import { selectTradeData } from "../../StockSlice";
import { useSelector } from "react-redux";
import { AccountWrapper, Tabs, AccountWiseTradeData } from "./portfolio.styles.";
import PortfolioRow from "./portfolioRow";
import constants from "../../../../node/constants";
import { RowWrapper, CellWrapper, InputField, ButtonWrapper } from "./portfolioRow.styles";

const convertArrayToObject = (array, key) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, initialValue);
};

const stockConstantsArr = convertArrayToObject(constants.allStocks, "symbol");

function Portfolio() {
  const accounts = ["asha-kite", "susant-kite", "asha-angel", "susant-angel", "susant-paytm", "asha-paytm", "susant-fyers"];
  const tradeData = useSelector(selectTradeData);
  const [selectedAc, setSelectedAc] = useState("asha-kite");
  const [totalInvested, setTotalInvested] = useState(0);
  const [sortedData, setSortedData] = useState(tradeData["asha-kite"]);
  const [sortedColumn, setSortedColumns] = useState("symbol");

  const calculateTotalInvested = (account) => {
    let totalInvested = 0;
    tradeData[account].forEach((trade) => {
      totalInvested += trade.average_price * trade.quantity;
    });
    return totalInvested.toFixed(2);
  };

  useEffect(()=>{
    handleSelection(selectedAc);
  }, [])

  const handleSelection = (account) => {
    setSelectedAc(account);
    const totalInvestedAmount = calculateTotalInvested(account);
    setTotalInvested(totalInvestedAmount);
    switch (account) {
      case "asha-kite": {
        window.ashaKite = totalInvestedAmount;
        break;
      }

      case "asha-angel": {
        window.ashaAngel = totalInvestedAmount;
        break;
      }
      case "susant-kite": {
        window.susantKite = totalInvestedAmount;
        break;
      }
      case "susant-paytm": {
        window.susantPaytm = totalInvestedAmount;
        break;
      }
      case "susant-fyers": {
        window.susantFyers = totalInvestedAmount;
        break;
      }
      case "asha-paytm": {
        window.ashaPaytm = totalInvestedAmount;
        break;
      }
      default:
        window.susantAngel = totalInvestedAmount;
    }

    window.totalInvested =
      parseFloat(window.susantAngel) +
      parseFloat(window.susantKite) +
      parseFloat(window.susantPaytm) +
      parseFloat(window.ashaAngel) +
      parseFloat(window.ashaPaytm) +
      parseFloat(window.susantFyers) +      
      parseFloat(window.ashaKite);
  };

  const sortByAngelname = () => {
    let selectedAcTradeData = [...sortedData];
    selectedAcTradeData = selectedAcTradeData.sort((a, b) => {
      //return a.stock_name.localeCompare()
      console.log(a.stock_name, b.stock_name);
      return (
        (stockConstantsArr[a.stock_name] && stockConstantsArr[a.stock_name].angelName) ||
        a.stock_name
      ).localeCompare(
        (stockConstantsArr[b.stock_name] && stockConstantsArr[b.stock_name].angelName) || b.stock_name
      );
    });

    console.log(selectedAcTradeData);

    setSortedData(selectedAcTradeData);
    setSortedColumns("name");
  };

  const sortByCode = () => {
    let selectedAcTradeData = [...sortedData];
    selectedAcTradeData = selectedAcTradeData.sort((a, b) => {
      return a.stock_name.localeCompare(b.stock_name);
    });

    console.log(selectedAcTradeData);

    setSortedData(selectedAcTradeData);
    setSortedColumns("symbol");
  };

  useEffect(() => {
    setSortedData(tradeData[selectedAc]);
  }, [selectedAc]);

  useEffect(() => {
    getTotalStocksInPortfolio();   
  }, [selectedAc]);

  const [totalPortfolioStockCount, setTotalPortfolioStockCount] = useState(0);

  const getTotalStocksInPortfolio = () => {   
    const tradedData = tradeData[selectedAc];
    const portfolioData = tradedData.filter((data) => {
      return data.quantity > 0;
    });
    setTotalPortfolioStockCount(portfolioData.length);
  };

  return (
    <div className="portfolio">
      {tradeData["asha-kite"] && (
        <>
          <Tabs>
            {accounts.map((account, index) => {
              return (
                <AccountWrapper
                  onClick={() => handleSelection(account)}
                  isSelected={selectedAc === account}
                  key={index}
                >
                  {account}
                </AccountWrapper>
              );
            })}
          </Tabs>
          <AccountWiseTradeData>
            <div>
              Total amount invested in the AC: <b>{totalInvested}</b> , Total bought Stocks in the AC:{" "}
              <b>{totalPortfolioStockCount}</b>
            </div>
            <div>
              {" "}
              Total in all Ac:{" "}
              <b>
                {window.totalInvested
                  ? window.totalInvested
                      .toFixed(2)
                      .toString()
                      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                  : 0}
              </b>
            </div>

            <RowWrapper isHeader={true}>
              <CellWrapper>Sl#</CellWrapper>
              <CellWrapper onClick={sortByCode} clickable={true} isSorted={sortedColumn === "symbol"}>
                Stock Code
              </CellWrapper>
              <CellWrapper onClick={sortByAngelname} clickable={true} isSorted={sortedColumn === "name"}>
                Stock Name
              </CellWrapper>
              <CellWrapper>Quantity</CellWrapper>
              <CellWrapper>Price</CellWrapper>
              <CellWrapper>Date of Buy</CellWrapper>
            </RowWrapper>
            {selectedAc &&
              sortedData.map((trade, index) => {
                return (
                  <PortfolioRow
                    trade={trade}
                    key={index}
                    serialNo={index + 1}
                    stockConstantsArr={stockConstantsArr}
                  />
                );
              })}
          </AccountWiseTradeData>
        </>
      )}
    </div>
  );
}

export default Portfolio;
