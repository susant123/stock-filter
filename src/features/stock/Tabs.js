import React, { useEffect } from "react";
import {Tab, TabsWrapper} from "./Tabs.styles";

const Tabs=()=> {  

  return (
    <div className="App" style={{ fontFamily: "sans-serif", fontSize: "16px" }}>
      <TabsWrapper>
        <Tab>Positive RSI</Tab>
        <Tab>Positive MACD</Tab>
        <Tab>Positive RSI and MACD</Tab>
        <Tab>All</Tab>
        <Tab>Account details(DB)</Tab>
      </TabsWrapper>
    </div>
  );
}

export default Tabs;
