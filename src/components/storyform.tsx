import { Dispatch, FC, useMemo, useState } from "react";
import { Action, ActionType } from "~/modules/storyeditor";
import styled from "styled-components";
import Button from "~/components/primarybutton";

interface Props {
  defaultTitle?: string;
  defaultBody?: string;
  dispatch: Dispatch<Action>;
}

const Container = styled.div`
  display: grid;
  gap: 20px;
  padding: 20px;
  box-sizing: border-box;
  grid-template-rows: 50px auto 45px;
  justify-content: space-between;
  > input,
  textarea {
    grid-column: 1 / 3;
  }
  > button {
    grid-column: 2;
    grid-row: 3;
  }

  @media screen and (min-width: 0) and (max-width: 719px) {
    height: 500px;
  }

  @media screen and (min-width: 720px) {
    height: calc(100vh - 76px);
  }
`;

const TitleInput = styled.input`
  outline: none;
  border: none;
  padding: 5px 10px;
  background-color: #fafafa;

  @media screen and (min-width: 0) and (max-width: 719px) {
    font-size: 18px;
  }

  @media screen and (min-width: 720px) {
    font-size: 22px;
  }
`;

const BodyTextarea = styled.textarea`
  line-height: 200%;
  outline: none;
  border: none;
  padding: 10px;
  resize: none;
  background-color: #fafafa;

  @media screen and (min-width: 0) and (max-width: 719px) {
    font-size: 14px;
  }

  @media screen and (min-width: 720px) {
    font-size: 16px;
  }
`;

interface RemainingCounterProps {
  color: string;
}

const RemainingCounter = styled.p<RemainingCounterProps>`
  color: ${(p) => p.color};
  margin: 0;
  font-size: 16px;
`;

const limit = 1000;

const StoryForm: FC<Props> = (props) => {
  const [length, setBodyLength] = useState(props.defaultBody?.length ?? 0);
  const bodyState = useMemo(() => {
    const remaining = limit - length;
    if (remaining < 0) {
      return { remaining, color: "red" };
    } else {
      const warningThreshould = 0.2;
      const percent = remaining / limit;
      return {
        remaining,
        color: percent < warningThreshould ? "orange" : "black",
      };
    }
  }, [length]);
  return (
    <Container>
      <TitleInput
        type="text"
        onChange={(e) => {
          props.dispatch({
            type: ActionType.updateTitle,
            payload: { text: e.target.value },
          });
        }}
        defaultValue={props.defaultTitle}
        placeholder={"題名"}
      />
      <BodyTextarea
        name=""
        id=""
        onChange={(e) => {
          setBodyLength(e.target.value.length);
          props.dispatch({
            type: ActionType.updateBody,
            payload: { text: e.target.value },
          });
        }}
        defaultValue={props.defaultBody}
        placeholder={"本文"}
      ></BodyTextarea>
      <RemainingCounter color={bodyState.color}>
        {bodyState.remaining}
      </RemainingCounter>
      <Button>投稿する</Button>
    </Container>
  );
};

export default StoryForm;
