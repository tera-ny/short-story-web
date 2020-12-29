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
  height: calc(100vh - 76px);
  gap: 20px;
  padding: 20px;
  margin-left: 20px;
  box-sizing: border-box;
  background-color: #fafafa;
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
`;

const TitleInput = styled.input`
  font-size: 22px;
  outline: none;
  border: none;
  padding: 5px 10px;
  background-color: white;
`;

const BodyTextarea = styled.textarea`
  font-size: 16px;
  line-height: 200%;
  outline: none;
  border: none;
  padding: 10px;
  resize: none;
  background-color: white;
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
