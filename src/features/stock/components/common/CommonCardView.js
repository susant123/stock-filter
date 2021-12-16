import React from "react";
import { StockSymbol, StockName } from "../commonStyles/cardStyles";

function CommonCardView(props) {
  const { nseData, stockName, nsePriceData } = props;
  const NotLivePrice = () => (
    <span>
      {nseData.priceInfo.lastPrice}
      <span style={{ color: "red" }}> &nbsp;Not live</span>
    </span>
  );
  return (
    <>
      <StockSymbol>
        {stockName}-(&nbsp;
        {nsePriceData ? nsePriceData.lastPrice : <NotLivePrice />}&nbsp;)
      </StockSymbol>
      <hr style={{ borderColor: "gray" }} />
      <StockName>
        {nseData.info.companyName}-({nseData.metadata.industry.toLowerCase()})
      </StockName>
      <StockName>
        Symbol PE- {nseData.metadata.pdSymbolPe} : Sector PE -{" "}
        {nseData.metadata.pdSectorPe}
      </StockName>

      <StockName isDanger={nseData.securityInfo.surveillance !== "-"}>
        Surveillance- {nseData.securityInfo.surveillance}
      </StockName>
    </>
  );
}

export default CommonCardView;
