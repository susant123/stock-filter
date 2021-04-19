import React, { useState } from "react";
import {
  RowWrapper,
  Cell,
  TableHeader,
  HeaderRow,
  ActionIcon,
  IconHeaderWrapper,
} from "./common.styles";

function EmaSma(props) {
  const [isOpen, setIsOpen] = useState(false);
  const { ema, sma } = props;
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <hr />
      <IconHeaderWrapper>
        <ActionIcon onClick={handleClick}>{isOpen ? "-" : "+"}</ActionIcon>
        <TableHeader>EMA/SMA Table</TableHeader>
      </IconHeaderWrapper>

      {isOpen && (
        <div>
          <HeaderRow>
            <Cell>Type</Cell>
            <Cell>Days</Cell>
            <Cell>Value</Cell>
            <Cell>Indicator</Cell>
          </HeaderRow>
          {ema.map((emaLevel) => {
            return (
              <RowWrapper>
                <Cell>EMA</Cell>
                <Cell>{emaLevel.key}</Cell>
                <Cell>{emaLevel.value}</Cell>
                <Cell>{emaLevel.indication}</Cell>
              </RowWrapper>
            );
          })}
          {sma.map((smaLevel, index) => {
            return (
              <RowWrapper key={index}>
                <Cell>SMA</Cell>
                <Cell>{smaLevel.key}</Cell>
                <Cell>{smaLevel.value}</Cell>
                <Cell>{smaLevel.indication}</Cell>
              </RowWrapper>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default EmaSma;
