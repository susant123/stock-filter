import React, { useState, lazy, Suspense } from "react";
import { Tab, TabsWrapper } from "./Tabs.styles";
import Portfolio from "../stock/components/portfolio/portfolio";
import InsertNewData from "./components/dataManage/insertData";

const AllCards = React.lazy(() => import("./components/allCards/AllCards"));

const AllPortfolios = lazy(() =>
  import("./components/allTradeDataportfolio/allPortfolios")
);

const AllCardsPositiveMACDRSI = lazy(() =>
  import("./components/allCardsPositiveMACDRSI/AllCards")
);

const AllCardsPositiveMACD = lazy(() =>
  import("./components/allCardsPositiveMACD/AllCards")
);

const AllCardsPositiveRSI = lazy(() =>
  import("./components/allCardsPositiveRSI/AllCards")
);

const AllCardsPositiveRSIBelow40 = lazy(() =>
  import("./components/allCardsPositiveRSIBelow40/AllCards")
);

const AllBoughtCards = lazy(() =>
  import("../stock/components/allBought/AllBoughtCards")
);

const BuyCards = lazy(() => import("../stock/components/buy/BuyCards"));
const SellCards = lazy(() => import("../stock/components/sell/SellCards"));

const Tabs = (props) => {
  const { livePlusIndicatorData } = props;
  const [activeTab, setActiveTab] = useState(1);

  const onTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  return (
    <div className="App" style={{ fontFamily: "sans-serif", fontSize: "16px" }}>
      <TabsWrapper>
        <Tab onClick={() => onTabClick(1)} active={activeTab === 1}>
          Sell Cards
        </Tab>
        <Tab onClick={() => onTabClick(2)} active={activeTab === 2}>
          Buy Cards
        </Tab>
        <Tab onClick={() => onTabClick(99)} active={activeTab === 99}>
          All Cards-Positive RSI Below 30
        </Tab>
        <Tab onClick={() => onTabClick(3)} active={activeTab === 3}>
          All Cards-Positive RSI
        </Tab>
        <Tab onClick={() => onTabClick(4)} active={activeTab === 4}>
          All Cards-Positive MACD
        </Tab>
        <Tab onClick={() => onTabClick(5)} active={activeTab === 5}>
          All Cards-Positive RSI & MACD
        </Tab>
        <Tab onClick={() => onTabClick(7)} active={activeTab === 7}>
          All Cards
        </Tab>
        <Tab onClick={() => onTabClick(10)} active={activeTab === 10}>
          Portfolio
        </Tab>
        <Tab onClick={() => onTabClick(11)} active={activeTab === 11}>
          All Portfolios
        </Tab>
        <Tab onClick={() => onTabClick(12)} active={activeTab === 12}>
          All Bought Cards
        </Tab>

        {/*<Tab>Positive MACD</Tab>
        <Tab>Positive RSI and MACD</Tab>
        <Tab>All</Tab>
        <Tab>Account details(DB)</Tab> */}
      </TabsWrapper>

      <div>
        {activeTab === 1 && (
          <Suspense fallback={<div>Loading....</div>}>
            <SellCards />
          </Suspense>
        )}
        {activeTab === 2 && (
          <Suspense fallback={<div>Loading....</div>}>
            <BuyCards />
          </Suspense>
        )}
        {activeTab === 99 && (
          <Suspense fallback={<div>Loading....</div>}>
            <AllCardsPositiveRSIBelow40
              livePlusIndicator={livePlusIndicatorData}
            />
          </Suspense>
        )}
        {activeTab === 3 && (
          <Suspense fallback={<div>Loading....</div>}>
            <AllCardsPositiveRSI livePlusIndicator={livePlusIndicatorData} />
          </Suspense>
        )}
        {activeTab === 4 && (
          <Suspense fallback={<div>Loading....</div>}>
            <AllCardsPositiveMACD livePlusIndicator={livePlusIndicatorData} />
          </Suspense>
        )}
        {activeTab === 5 && (
          <Suspense fallback={<div>Loading....</div>}>
            <AllCardsPositiveMACDRSI
              livePlusIndicator={livePlusIndicatorData}
            />
          </Suspense>
        )}

        {activeTab === 7 && (
          <Suspense fallback={<div>Loading....</div>}>
            <AllCards livePlusIndicator={livePlusIndicatorData} />
          </Suspense>
        )}
        {activeTab === 10 && (
          <>
            <InsertNewData />
            <Portfolio />{" "}
          </>
        )}

        {activeTab === 11 && (
          <Suspense fallback={<div>Loading....</div>}>
            <AllPortfolios />
          </Suspense>
        )}

        {activeTab === 12 && (
          <Suspense fallback={<div>Loading....</div>}>
            <AllBoughtCards />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default Tabs;
