import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  RowWrapper,
  CellWrapper,
  InputField,
  ButtonWrapper,
} from "./portfolioRow.styles";
import { updateStock } from "../../StockSlice";

function PortfolioRow({ trade }) {
  const dispatch = useDispatch();
  const [price, setPrice] = useState(trade.average_price);
  const [quantity, setQuantity] = useState(trade.quantity);
  const [valueChanged, setValueChanged] = useState(false);

  useEffect(() => {
    setPrice(trade.average_price);
    setQuantity(trade.quantity);
  }, [trade]);

  const soldHandler = () => {
    setPrice("");
    setQuantity("");
    dispatch(
      updateStock({
        stockName: trade.stock_name,
        account: trade.account,
        quantity: null,
        price: null,
      })
    );
  };
  const savehandler = () => {
    setValueChanged(false);
    dispatch(
      updateStock({
        stockName: trade.stock_name,
        account: trade.account,
        quantity: quantity,
        price: price,
      })
    );
  };

  const handleChange = (value, cb) => {
    setValueChanged(true);
    cb(value);
  };

  return (
    <RowWrapper className="portfolio" valueChanged={valueChanged}>
      <CellWrapper>{trade.stock_name}</CellWrapper>
      <CellWrapper>
        <InputField
          value={quantity || ""}
          onChange={(e) => handleChange(e.target.value, setQuantity)}
        />
      </CellWrapper>
      <CellWrapper>
        <InputField
          value={price || ""}
          onChange={(e) => setPrice(e.target.value)}
        />
      </CellWrapper>
      <ButtonWrapper onClick={soldHandler}>Sold</ButtonWrapper>
      <ButtonWrapper onClick={savehandler}>Save</ButtonWrapper>
    </RowWrapper>
  );
}

export default PortfolioRow;
