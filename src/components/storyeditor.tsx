import {
  Dispatch,
  FC,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Action, ActionType, State } from "~/modules/storyeditor";
import selector from "~/modules/storyeditor/selector";
import styled from "styled-components";
import Button from "~/components/primarybutton";
import { storyCollectionRef } from "~/modules/firebase";
import { Context } from "~/modules/auth";
import Indicator from "./indicator";
import firebase from "firebase/app";
import "firebase";

interface Props {
  state: State;
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
    font-size: 20px;
  }

  @media screen and (min-width: 720px) {
    font-size: 24px;
  }
`;

const BodyTextarea = styled.textarea`
  line-height: 200%;
  outline: none;
  border: none;
  padding: 10px;
  resize: none;
  background-color: #fafafa;
  font-size: 16px;
  white-space: pre-wrap;
`;

const ButtonContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

interface NotesProps {
  disabled: boolean;
}

const Notes = styled.div<NotesProps>`
  padding: 10px;
  position: absolute;
  background-color: white;
  bottom: 60px;
  left: 0;
  margin: 0;
  display: ${(p) => (p.disabled ? "none" : "flex")};
  border: 3px solid rgba(0, 0, 0, 0.8);
  font-size: 12px;
  font-weight: 100;
  white-space: pre-wrap;

  ::before {
    content: "";
    position: absolute;
    top: 100%;
    border-width: 10px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.8) transparent transparent;
    height: 0;
    left: 9px;
    width: 0;
  }
  ::after {
    content: "";
    position: absolute;
    top: 100%;
    border-width: 6px;
    border-style: solid;
    border-color: white transparent transparent;
    height: 0;
    left: 13px;
    width: 0;
  }
`;

const Help = styled.img`
  padding: 0 10px;
  cursor: pointer;
`;

const SubmitButton = styled(Button)`
  width: 150px;
  height: 100%;
`;

interface RemainingCounterProps {
  color: string;
}

const RemainingCounter = styled.p<RemainingCounterProps>`
  color: ${(p) => p.color};
  margin: 0;
  font-size: 16px;
  width: 50px;
`;

const Editor: FC<Props> = (props) => {
  const [length, setBodyLength] = useState(props.state.body.length ?? 0);
  const [disabledNote, setDisabledNote] = useState(true);
  const authContext = useContext(Context);
  const [isUpdating, setIsUpdating] = useState(false);
  const bodyState = useMemo(() => {
    const remaining = props.state.limit - length;
    if (remaining < 0) {
      return { remaining, color: "red" };
    } else {
      const warningThreshould = 0.2;
      const percent = remaining / props.state.limit;
      return {
        remaining,
        color: percent < warningThreshould ? "orange" : "black",
      };
    }
  }, [length, props.state.limit]);
  const submit = useCallback(async () => {
    if (!authContext.subscribed?.user) {
      return;
    }
    const state = props.state;
    try {
      setIsUpdating(true);
      let ref: firebase.firestore.DocumentReference;
      if (state.ref) {
        ref = state.ref;
        await ref.update({
          title: state.title,
          body: state.body,
          updateTime: firebase.firestore.FieldValue.serverTimestamp(),
        });
      } else {
        ref = await storyCollectionRef(authContext.subscribed.user.uid).add({
          title: state.title,
          body: state.body,
          isActive: true,
          isPublished: true,
          createTime: firebase.firestore.FieldValue.serverTimestamp(),
          updateTime: firebase.firestore.FieldValue.serverTimestamp(),
        });
      }
      setIsUpdating(false);
      props.dispatch({ type: ActionType.submitted, payload: { ref: ref } });
    } catch (error) {
      console.error(error);
      setIsUpdating(false);
    }
  }, [props.state, authContext.subscribed]);
  const toggleDisabledNote = useCallback(() => {
    setDisabledNote(!disabledNote);
  }, [disabledNote]);
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
        placeholder={"題名"}
        value={props.state.title}
      />
      <BodyTextarea
        onChange={(e) => {
          setBodyLength(e.target.value.length);
          props.dispatch({
            type: ActionType.updateBody,
            payload: { text: e.target.value },
          });
        }}
        placeholder={"本文"}
        value={props.state.body}
      ></BodyTextarea>
      <RemainingCounter color={bodyState.color}>
        {bodyState.remaining}
      </RemainingCounter>
      <ButtonContainer>
        <Indicator visible={isUpdating} width={20} height={20} />
        <Help
          src="/images/help.svg"
          onClick={() => {
            toggleDisabledNote();
          }}
        />
        <Notes disabled={disabledNote}>
          {
            " タイトルは一文字以上二十五文字以内、\n 本文は改行を含めた一文字以上千文字以内に収める必要があります"
          }
        </Notes>
        <SubmitButton
          disabled={!selector.cnaRegister(props.state)}
          onClick={() => {
            submit();
          }}
        >
          投稿する
        </SubmitButton>
      </ButtonContainer>
    </Container>
  );
};

export default Editor;
