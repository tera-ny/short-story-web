import { FC } from "react";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  padding: 3px 5px 5px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  font-size: 16px;
  padding: 0 5px;
  width: 100%;
  box-sizing: border-box;
`;

const Prefix = styled.p`
  font-size: 13px;
  margin: 0;
`;

type Props = {
  title?: string;
  value?: string | number | readonly string[];
  placeholder?: string;
  type?: string;
  changeValue?: (value: string) => void;
};

const InputForm: FC<Props> = (props) => (
  <Container>
    {props.title && <Prefix>{props.title}</Prefix>}
    <Input
      {...props}
      onChange={(e) => {
        if (props.changeValue) {
          props.changeValue(e.target.value);
        }
      }}
    />
  </Container>
);

export default InputForm;
