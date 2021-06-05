import React, { useState } from "react";

import { SentimentRowWrapper, Cell, SentimentHeaderRow } from "./common.styles";
import {
  IconHeaderWrapper,
  ActionIcon,
  TableHeader,
} from "../commonStyles/commonStyles";

function SentimentsTable({ sentiments }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const {
    indication,
    totalBearish,
    totalBullish,
    totalNeutral,
    indicatorsSentiment,
    movingAverageCrossOverSentiment,
    movingAverageSentiment,
  } = sentiments;
  const sentimentData = [];
  sentimentData.push({ key: "indicatorsSentiment", ...indicatorsSentiment });
  sentimentData.push({
    key: "MA CrossOverSentiment",
    ...movingAverageCrossOverSentiment,
  });
  sentimentData.push({
    key: "movingAverageSentiment",
    ...movingAverageSentiment,
  });

  return (
    <div>
      <hr />
      <IconHeaderWrapper>
        <ActionIcon onClick={handleClick}>{isOpen ? "-" : "+"}</ActionIcon>
        <TableHeader>Sentiments Table</TableHeader>
      </IconHeaderWrapper>
      {isOpen && (
        <div>
          <SentimentHeaderRow>
            <Cell>Type</Cell>
            <Cell>Bullish</Cell>
            <Cell>Bearish</Cell>
            <Cell>Neutral</Cell>
            <Cell>Indication</Cell>
          </SentimentHeaderRow>
          {sentimentData.map((sentiment, index) => {
            return (
              <SentimentRowWrapper key={index}>
                <Cell>{sentiment.key}</Cell>
                <Cell>{sentiment.bullishCount}</Cell>
                <Cell>{sentiment.bearishCount}</Cell>
                <Cell>{sentiment.neutralCount}</Cell>
                <Cell>{sentiment.indication}</Cell>
              </SentimentRowWrapper>
            );
          })}

          <SentimentRowWrapper>
            <Cell>Total</Cell>
            <Cell>{totalBullish}</Cell>
            <Cell>{totalBearish}</Cell>
            <Cell>{totalNeutral}</Cell>
            <Cell>{indication}</Cell>
          </SentimentRowWrapper>
        </div>
      )}
    </div>
  );
}

export default SentimentsTable;
