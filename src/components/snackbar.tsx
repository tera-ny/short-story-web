import { FC, useEffect, useState } from "react";
import styled from "styled-components";

export interface Content {
  body: string;
  button?: {
    text: string;
    action?: () => void;
  };
}

const SnackbarTemplate = styled.div`
  background-color: rgb(59, 59, 59);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3);
  height: 52px;
  position: fixed;
  left: 10px;
  right: 10px;
  bottom: 10px;
  z-index: 999;
  border-radius: 8px;
  font-size: 12px;
  padding: 0 20px;
  text-overflow: ellipsis;
  @media screen and (min-width: 720px) {
    max-width: 400px;
  }
`;

const ActionButton = styled.button`
  color: #5c87fd;
  background-color: transparent;
  border: none;
  outline: none;
  padding: 12 20px;
  font-size: 16px;
`;

const Snackbar: FC<Content> = (props) => {
  const [displayButton, setDisplayButton] = useState(
    props.button !== undefined
  );
  const [dismiss, setDismiss] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setDismiss(true);
    }, 3000);
  });
  return (
    <>
      {!dismiss && (
        <SnackbarTemplate>
          {props.body}{" "}
          {displayButton && (
            <ActionButton
              onClick={() => {
                if (props.button.action) {
                  props.button.action();
                }
                setDisplayButton(false);
              }}
            >
              {props.button.text}
            </ActionButton>
          )}
        </SnackbarTemplate>
      )}
    </>
  );
};

export default Snackbar;
