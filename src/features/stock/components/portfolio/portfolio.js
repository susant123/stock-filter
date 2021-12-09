import React, { useState } from "react";
import { selectTradeData } from "../../StockSlice";
import { useSelector } from "react-redux";
import {
  AccountWrapper,
  Tabs,
  AccountWiseTradeData,
} from "./portfolio.styles.";
import PortfolioRow from "./portfolioRow";

function Portfolio() {
  const accounts = ["asha-kite", "susant-kite", "asha-angel", "susant-angel"];
  const tradeData = useSelector(selectTradeData);
  const [selectedAc, setSelectedAc] = useState(null);
  const [totalInvested, setTotalInvested] = useState(0);

  const calculateTotalInvested = (account) => {
    let totalInvested = 0;
    tradeData[account].forEach((trade) => {
      totalInvested += trade.average_price * trade.quantity;
    });
    return totalInvested.toFixed(2);
  };

  const handleSelection = (account) => {
    setSelectedAc(account);
    const totalInvestedAmount = calculateTotalInvested(account);
    setTotalInvested(totalInvestedAmount);
    switch(account){
      case "asha-kite":{
        window.ashaKite = totalInvestedAmount;
        break;
      }
      
      case "asha-angel":{
        window.ashaAngel = totalInvestedAmount;
        break;
      }
      case "susant-kite":{
        window.susantKite = totalInvestedAmount;
        break;
      }
      default:
        window.susantAngel = totalInvestedAmount;
    }

    window.totalInvested = parseFloat(window.susantAngel) + parseFloat( window.susantKite) +parseFloat( window.ashaAngel) +parseFloat( window.ashaKite);

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
            <div>{totalInvested} </div>
            <div> Total in all Ac: <b>{window.totalInvested? window.totalInvested.toFixed(2).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","):0}</b> </div>
            {selectedAc &&
              tradeData[selectedAc].map((trade, index) => {
                return (
                  <PortfolioRow
                    trade={trade}
                    key={index}
                    serialNo={index + 1}
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
