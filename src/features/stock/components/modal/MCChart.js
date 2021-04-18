import React, { useState } from "react";
import {
  ShowChart,
  IFrameContainer,
  CloseButton,
  StyledIframe,
} from "./ShowChart.styles";

function MCChart({ stockName }) {
  const [showModal, setShowModal] = useState(false);
  const handleClick = () => {
    setShowModal(!showModal);
  };
  const chartUrl =
    "https://www.moneycontrol.com/mc/stock/chart?scId=" + stockName;
  return (
    <div>
      <ShowChart onClick={handleClick}>Show Chart</ShowChart>
      {showModal && (
        <IFrameContainer>
          <CloseButton onClick={handleClick}>X</CloseButton>
          <StyledIframe src={chartUrl} />
        </IFrameContainer>
      )}
    </div>
  );
}

export default MCChart;
