import React, { useState } from "react";

import {
  RowWrapper,
  Cell,
  TableHeader,
  HeaderRow,
  ActionIcon,
  IconHeaderWrapper,
} from "./common.styles";

function VolumeData({ volumeData }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const volume = volumeData.stock_price_volume_data.volume;
  const volumeDataArr = [
    { key: "Today", ...volume["Today"] },
    { key: "Yesterday", ...volume["Yesterday"] },
    { key: "1 Week", ...volume["1 Week"] },
    { key: "1 Month", ...volume["1 Month"] },
  ];

  return (
    <div>
      <hr />
      <IconHeaderWrapper>
        <ActionIcon onClick={handleClick}>{isOpen ? "-" : "+"}</ActionIcon>
        <TableHeader>Volume Table</TableHeader>
      </IconHeaderWrapper>

      {isOpen && (
        <div>
          <HeaderRow>
            <Cell>Type</Cell>
            <Cell>Total Vol</Cell>
            <Cell>Delivery</Cell>
            <Cell>% of delivery</Cell>
          </HeaderRow>
          {volumeDataArr.map((range) => {
            return (
              <RowWrapper key={range.key}>
                <Cell>{range.key}</Cell>
                <Cell>{range.cvol}</Cell>
                <Cell>{range.delivery}</Cell>
                <Cell>
                  {(
                    ((range.cvol - range.delivery) / range.cvol) *
                    100
                  ).toFixed()}
                </Cell>
              </RowWrapper>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default VolumeData;
