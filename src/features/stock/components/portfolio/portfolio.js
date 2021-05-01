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

  const handleSelection = (account) => {
    setSelectedAc(account);
  };

  //console.log("tradeData--------------", tradeData);
  return (
    <div className="portfolio">
      {tradeData["asha-kite"] && (
        <>
          <Tabs>
            {accounts.map((account, index) => {
              return (
                <AccountWrapper
                  onClick={() => handleSelection(account)}
                  isSelected={selectedAc == account}
                  key={index}
                >
                  {account}
                </AccountWrapper>
              );
            })}
          </Tabs>
          <AccountWiseTradeData>
            {selectedAc &&
              tradeData[selectedAc].map((trade, index) => {
                return <PortfolioRow trade={trade} key={index} />;
              })}
          </AccountWiseTradeData>
        </>
      )}
    </div>
  );
}

export default Portfolio;
