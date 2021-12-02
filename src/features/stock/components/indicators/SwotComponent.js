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

  const info = swot?swot.info:null;
  useEffect(() => {
    info && info.map((strength, index) => {
      if (strength.indexOf("Red Flag") !== -1) {
        setIsRedFlag(true);
      }
      if (strength.indexOf("Brokers upgraded recommendation") !== -1) {
        setIsGreenFlag(true);
      }
      return true;
    });
  }, [info]);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    {swot && <Wrapper isRedFlag={isRedFlag} isGreenFlag={isGreenFlag}>
      <IconHeaderWrapper>
        <ActionIcon onClick={handleClick}>{isOpen ? "-" : "+"}</ActionIcon>
        <CountLabel>{swot.count}</CountLabel>
      </IconHeaderWrapper>
      {isOpen && (
        <ol>
          {swot.info.map((strength, index) => {
            //setIsRedFlag(strength.indexOf("Red Flag") !== -1);
            return <li key={index}>{strength}</li>;
          })}
        </ol>
      )}
    </Wrapper> }
    </>
  );
}

export default SwotComponent;
