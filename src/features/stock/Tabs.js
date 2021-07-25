import React, { useState } from "react";
import { Tab, TabsWrapper } from "./Tabs.styles";
import SellCards from "../stock/components/sell/SellCards";
import BuyCards from "../stock/components/buy/BuyCards";
import Portfolio from "../stock/components/portfolio/portfolio";
import InsertNewData from "./components/dataManage/insertData";
import AllCardsPositiveRSIBelow40 from "./components/allCardsPositiveRSIBelow40/AllCards";
import AllCardsPositiveRSI from "./components/allCardsPositiveRSI/AllCards";
import AllCardsPositiveMACD from "./components/allCardsPositiveMACD/AllCards";
import AllCardsPositiveMACDRSI from "./components/allCardsPositiveMACDRSI/AllCards";

import AllCards from "./components/allCards/AllCards";

import AllPortfolios from "./components/allTradeDataportfolio/allPortfolios";

const Tabs = (props) => {
  const { livePlusIndicatorData } = props;
  const [activeTab, setActiveTab] = useState(1);

  const onTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  return (
    <div className="App" style={{ fontFamily: "sans-serif", fontSize: "16px" }}>
      <TabsWrapper>
        <Tab onClick={() => onTabClick(1)} active={activeTab == 1}>
          Sell Cards
        </Tab>
        <Tab onClick={() => onTabClick(2)} active={activeTab == 2}>
          Buy Cards
        </Tab>
        <Tab onClick={() => onTabClick(99)} active={activeTab == 99}>
          All Cards-Positive RSI Below 40
        </Tab>
        <Tab onClick={() => onTabClick(3)} active={activeTab == 3}>
          All Cards-Positive RSI
        </Tab>
        <Tab onClick={() => onTabClick(4)} active={activeTab == 4}>
          All Cards-Positive MACD
        </Tab>

        <Tab onClick={() => onTabClick(5)} active={activeTab == 5}>
          All Cards-Positive RSI & MACD
        </Tab>

        <Tab onClick={() => onTabClick(7)} active={activeTab == 7}>
          All Cards
        </Tab>

        <Tab onClick={() => onTabClick(10)} active={activeTab == 10}>
          Portfolio
        </Tab>
        <Tab onClick={() => onTabClick(11)} active={activeTab == 11}>
          All Portfolios
        </Tab>

        {/*<Tab>Positive MACD</Tab>
        <Tab>Positive RSI and MACD</Tab>
        <Tab>All</Tab>
        <Tab>Account details(DB)</Tab> */}
      </TabsWrapper>

      <div>
        {activeTab == 1 && <SellCards />}
        {activeTab == 2 && <BuyCards />}
        {activeTab == 99 && (
          <AllCardsPositiveRSIBelow40
            livePlusIndicator={livePlusIndicatorData}
          />
        )}
        {activeTab == 3 && (
          <AllCardsPositiveRSI livePlusIndicator={livePlusIndicatorData} />
        )}
        {activeTab == 4 && (
          <AllCardsPositiveMACD livePlusIndicator={livePlusIndicatorData} />
        )}
        {activeTab == 5 && (
          <AllCardsPositiveMACDRSI livePlusIndicator={livePlusIndicatorData} />
        )}

        {activeTab == 7 && (
          <AllCards livePlusIndicator={livePlusIndicatorData} />
        )}
        {activeTab == 10 && (
          <>
            <InsertNewData />
            <Portfolio />{" "}
          </>
        )}

        {activeTab == 11 && (
          <>
            <AllPortfolios />{" "}
          </>
        )}
      </div>
    </div>
  );
};

export default Tabs;
