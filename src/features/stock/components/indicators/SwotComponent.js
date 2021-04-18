import React, { useState, useEffect } from "react";
import {
  ActionIcon,
  IconHeaderWrapper,
  CountLabel,
  Wrapper,
} from "./SwotComponent.styles";

function SwotComponent({ swot }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRedFlag, setIsRedFlag] = useState(false);
  const [isGreenFlag, setIsGreenFlag] = useState(false);
  useEffect(() => {
    swot.data.info.map((strength, index) => {
      if (strength.indexOf("Red Flag") !== -1) {
        setIsRedFlag(true);
      }
      if (strength.indexOf("Brokers upgraded recommendation") !== -1) {
        setIsGreenFlag(true);
      }
    });
  }, []);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  //console.log("swot.data", swot.data);
  return (
    <Wrapper isRedFlag={isRedFlag} isGreenFlag={isGreenFlag}>
      <IconHeaderWrapper>
        <ActionIcon onClick={handleClick}>{isOpen ? "-" : "+"}</ActionIcon>
        <CountLabel>{swot.data.count}</CountLabel>
      </IconHeaderWrapper>
      {isOpen && (
        <ol>
          {swot.data.info.map((strength, index) => {
            //setIsRedFlag(strength.indexOf("Red Flag") !== -1);
            return <li key={index}>{strength}</li>;
          })}
        </ol>
      )}
    </Wrapper>
  );
}

export default SwotComponent;
