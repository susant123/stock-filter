import React, { useState } from "react";
import { Cell, PivotHeaderRow, PivotRowWrapper } from "./common.styles";
import {
  IconHeaderWrapper,
  ActionIcon,
  TableHeader,
} from "../commonStyles/commonStyles";
export default function PivotLevelsTable(props) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const { pivotLevels } = props;
  return (
    <div>
      <hr />
      <IconHeaderWrapper>
        <ActionIcon onClick={handleClick}>{isOpen ? "-" : "+"}</ActionIcon>
        <TableHeader>Pivot Table</TableHeader>
      </IconHeaderWrapper>
      {isOpen && (
        <div>
          <PivotHeaderRow>
            <Cell>Type</Cell>
            <Cell>R1</Cell>
            <Cell>R2</Cell>
            <Cell>R3</Cell>
            <Cell>S1</Cell>
            <Cell>S2</Cell>
            <Cell>S3</Cell>
          </PivotHeaderRow>
          {pivotLevels?.map((pivot, index) => {
            return (
              <PivotRowWrapper key={index}>
                <Cell>{pivot.key}</Cell>
                <Cell>{pivot.pivotLevel.r1}</Cell>
                <Cell>{pivot.pivotLevel.r2}</Cell>
                <Cell>{pivot.pivotLevel.r3}</Cell>
                <Cell>{pivot.pivotLevel.s1}</Cell>
                <Cell>{pivot.pivotLevel.s2}</Cell>
                <Cell>{pivot.pivotLevel.s3}</Cell>
              </PivotRowWrapper>
            );
          })}
        </div>
      )}
    </div>
  );
}
