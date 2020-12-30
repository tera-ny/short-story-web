import styled from "styled-components";

const Button = styled.button`
  outline: none;
  border: none;
  color: white;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  padding: 5px 20px;
  :active {
    color: rgba(250, 250, 250, 0.8);
    background-color: rgba(0, 0, 0, 0.85);
  }
  :disabled {
    color: white;
    background-color: rgba(220, 220, 220, 0.8);
  }
  :not(:disabled) {
    cursor: pointer;
  }
`;

export default Button;
