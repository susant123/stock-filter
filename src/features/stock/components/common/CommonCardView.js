import React from "react";
import { StockSymbol, StockName } from "../commonStyles/cardStyles";

function CommonCardView(props) {
  const { nseData, stockName } = props;

  return (
    <>
      <StockSymbol>
        {stockName}-({nseData.priceInfo.lastPrice})
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
