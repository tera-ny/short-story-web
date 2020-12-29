import styled from "styled-components";

const Button = styled.a`
  outline: none;
  border: none;
  color: white;
  background-color: rgba(0, 0, 0, 0.8);
  cursor: pointer;
  :active {
    color: rgba(250, 250, 250, 0.8);
    background-color: rgba(0, 0, 0, 0.85);
  }
  :disabled {
    color: white;
    background-color: rgba(220, 220, 220, 0.8);
  }

  @media screen and (min-width: 0) and (max-width: 719px) {
    font-size: 14px;
    font-weight: 300;
    padding: 5px 10px;
    border-radius: 4px;
  }

  @media screen and (min-width: 720px) {
    font-size: 18px;
    font-weight: 300;
    padding: 10px 20px;
    border-radius: 8px;
  }
`;

export default Button;
