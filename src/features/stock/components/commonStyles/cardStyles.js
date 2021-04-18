import styled from "@emotion/styled";

export const CardBlock = styled.div`
  border: 1px solid red;
  width: 500px;
  margin-right: 15px;
  height: auto;
  background-color: #cecece;
  padding: 15px 10px;
  border-radius: 4px;
  margin-bottom: 20px;
`;

export const SellCardBlock = styled(CardBlock)`
  background-color: #86c486;
`;

export const GridBody = styled.div`
  display: grid;
  grid-template-columns: 35% 65%;
  grid-gap: 5px;
`;

const Labels = styled.div`
  display: flex;
  font-size: 16px;
  padding: 5px;
`;

export const GridAction = styled(Labels)`
  border-radius: 4px 0 0 4px;
`;

export const AccuntName = styled(Labels)`
  border-radius: 0 4px 4px 0;
  text-transform: capitalize;
`;

export const QuantityBlock = styled.div`
  text-align: center;
  padding-top: 10px;
`;

export const Button = styled.button`
  text-align: center;
  background-color: #4caf50;
  color: black;
  border: 1px solid #ccc;
  margin: 5px 0 0 5px;
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-color: #4caf50;
    color: white;
    border: 1px solid #c0c0c0;
  }
`;

export const Title = styled.div`
  margin-bottom: 5px;
`;

export const InputField = styled.input`
  padding: 4px;
`;
export const StockSymbol = styled.div`
  font-size: 20px;
  color: #333;
  text-align: center;
  font-weight: bold;
`;

export const StockName = styled.div`
  font-size: 12px;
  color: #333;
  text-align: center;
  font-weight: bold;
`;

export const GridTitle = styled.div`
  font-size: 15px;
  color: #000;
  font-weight: bold;
`;

export const Label = styled.div`
  font-size: 15px;
  font-weight: bold;
`;

export const RowWrapper = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
  grid-gap: 5px;
  justify-content: center;
  align-items: center;
`;
export const TableHeader = styled.div`
  font-size: 18px;
  text-align: center;
  padding: 0 0 5px 0;
  width: 100%;
`;
