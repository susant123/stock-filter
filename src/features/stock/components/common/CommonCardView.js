import React from "react";
import { StockSymbol, StockName } from "../commonStyles/cardStyles";

function CommonCardView(props) {
  const { nseData, stockName, nsePriceData } = props;

  const marketCap =
    nseData.securityInfo && nseData.securityInfo.issuedSize !== "-"
      ? Math.floor((parseInt(nseData.securityInfo.issuedSize, 10) * nseData.priceInfo.lastPrice) / 10000000)
      : "Unknown";

  //const marketCap = nsePriceData?.ffmc ? Math.floor(nsePriceData.ffmc / 10000000): "-";

  //console.log("--------------nseData?.securityInfo?.surveillance.surv", nseData?.securityInfo?.surveillance.surv)
  const NotLivePrice = () => (
    <span>
      {nseData?.priceInfo?.lastPrice}
      <span style={{ color: "red" }}> &nbsp;NL</span>
    </span>
  );
  return (
    <>
      <StockSymbol>
        {stockName}-(&nbsp;
        {nsePriceData ? nsePriceData.lastPrice : <NotLivePrice />}&nbsp;) - ({marketCap} Cr)
      </StockSymbol>
      <hr style={{ borderColor: "gray" }} />
      <StockName>
        {nseData?.info?.companyName}-({nseData?.metadata?.industry?.toLowerCase()})
      </StockName>
      <StockName>
        Symbol PE- {nseData?.metadata?.pdSymbolPe} : Sector PE - {nseData?.metadata?.pdSectorPe}
      </StockName>

      <StockName isDanger={nseData?.securityInfo?.surveillance.surv !== "-"}>
        Surveillance- {nseData?.securityInfo?.surveillance?.surv}
      </StockName>
    </>
  );
}

export default CommonCardView;
