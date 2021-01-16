import styled from "styled-components";
import {
  FC,
  useState,
  useContext,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import PrimaryButton from "~/components/primarybutton";
import { Context } from "~/modules/auth";
import ProfileIconEditor from "~/components/profileiconeditor";
import { css } from "styled-components";
import {
  firebaseApp,
  FirestorePath,
  sendEmailVerification,
} from "~/modules/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import Indicator from "~/components/indicator";
import Image from "next/image";
import Snackbar, { Content as SnackbarContent } from "~/components/snackbar";

const NameStyle = css`
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  margin: 0;
`;

const AboutMeStyle = css`
  font-weight: 300;
  margin: 0;
  line-height: 180%;
`;

const Name = styled.h1`
  ${NameStyle}
`;

const AboutMe = styled.p`
  ${AboutMeStyle}
  max-width: 500px;
  padding: 22px 20px 0;
  font-size: 13px;
  white-space: pre-wrap;
  text-align: center;
`;

const ProfileContainer = styled.div`
  display: grid;
  justify-content: stretch;
  @media screen and (min-width: 0) and (max-width: 719px) {
    row-gap: 12px;
  }
  @media screen and (min-width: 720px) {
    row-gap: 16px;
  }
`;

const ActionButton = styled(PrimaryButton)`
  font-weight: 500;
  padding: 10px 28px;
  justify-self: center;
  min-width: 125px;
`;

const CancelButton = styled(ActionButton)`
  color: rgba(0, 0, 0, 0.8);
  background-color: white;
  border: 1px rgba(0, 0, 0, 0.8) solid;
  margin-left: 12px;
  :active {
    background-color: white;
    color: rgba(0, 0, 0, 0.5);
    border-color: rgba(0, 0, 0, 0.5);
  }
  :disabled {
    border: none;
  }
`;

const ImageContainer = styled.div`
  display: grid;
  justify-self: center;
  justify-content: stretch;
  row-gap: 10px;
  overflow: hidden;
  grid-auto-columns: 100%;
  img {
    border-radius: 50%;
  }
  width: 32%;
  min-width: 80px;
`;

const NameInput = styled.input`
  ${NameStyle}
  outline: none;
  border: none;
  font-family: "Noto Sans JP", sans-serif;
`;

const AboutMeTextArea = styled.textarea`
  ${AboutMeStyle}
  outline: none;
  border: 0.5px rgba(0, 0, 0, 0.5) solid;
  border-radius: 4px;
  resize: vertical;
  min-height: 120px;
  width: 100%;
  max-width: 500px;
  font-size: 16px;
  padding: 8px;
  box-sizing: border-box;
  font-family: "Noto Sans JP", sans-serif;
`;

const UploadIndicator = styled(Indicator)`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
`;

const EditorToolBar = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: flex-end;
  height: 40px;
`;

const HeadingContainer = styled.div`
  display: grid;
  row-gap: 32px;
  justify-content: stretch;
  width: 100%;
  max-width: 500px;
  box-sizing: border-box;
  @media screen and (min-width: 0) and (max-width: 719px) {
    padding: 60px 20px 40px;
  }
  @media screen and (min-width: 720px) {
    padding: 100px 0 80px;
  }
`;

interface HeadingProps {
  name: string;
  icon?: string;
  id: string;
  aboutMe?: string;
}

const UserHeader: FC<HeadingProps> = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [icon, setIcon] = useState(props.icon);
  const [editingName, setEditingName] = useState(props.name);
  const [editingAboutMe, setEditingAboutMe] = useState(props.aboutMe);
  const [isUploading, setIsUploading] = useState(false);
  const context = useContext(Context);

  const [snackbar, setSnackbar] = useState<SnackbarContent>(undefined);

  const canSubmit = useMemo(() => 0 < editingName.length, [editingName]);

  useEffect(() => {
    if (isEditing && snackbar) {
      setSnackbar(undefined);
    }
  }, [snackbar, isEditing]);

  const submit = useCallback(async () => {
    if (editingName && context.auth?.user) {
      try {
        setIsUploading(true);
        await firebaseApp()
          .firestore()
          .collection(FirestorePath.user)
          .doc(context.auth.user.uid)
          .set(
            {
              name: editingName,
              aboutMe: editingAboutMe ?? "",
              updateTime: firebase.firestore.FieldValue.serverTimestamp(),
            },
            { merge: true }
          );
        setIsUploading(false);
        setIsEditing(false);
        setSnackbar({
          body: "更新完了しました！反映までに1,2分程度かかる場合があります。",
        });
      } catch (e) {
        setIsUploading(false);
      }
    }
  }, [editingName, editingAboutMe, context.auth]);

  const callSendEmail = useCallback(async () => {
    await sendEmailVerification();
  }, []);

  return (
    <HeadingContainer>
      <ProfileContainer>
        <ImageContainer>
          <Image
            key={icon}
            src={icon ?? "/images/user-icon.svg"}
            alt="icon"
            layout={"responsive"}
            quality={50}
            loading={"lazy"}
            width={200}
            height={200}
          />
          {isEditing && context.auth?.user && (
            <>
              <ProfileIconEditor
                uploaded={setIcon}
                uid={context.auth.user.uid}
              />
            </>
          )}
        </ImageContainer>
        {isEditing ? (
          <>
            <NameInput
              type="text"
              value={editingName}
              onChange={(e) => {
                if (!isUploading) {
                  setEditingName(e.target.value);
                }
              }}
            />
            <AboutMeTextArea
              value={editingAboutMe}
              placeholder={
                "あなたについてを書くことで読者の方に向けてあなたを知ってもらうことができます。"
              }
              onChange={(e) => {
                if (!isUploading) {
                  setEditingAboutMe(e.target.value);
                }
              }}
            ></AboutMeTextArea>
          </>
        ) : (
          <div>
            <Name>{props.name}</Name>
            {props.aboutMe && <AboutMe>{props.aboutMe}</AboutMe>}
          </div>
        )}
      </ProfileContainer>
      {context.auth && (
        <>
          {context.auth.user?.uid === props.id ? (
            <>
              {isEditing && (
                <EditorToolBar>
                  <UploadIndicator
                    visible={isUploading}
                    width={20}
                    height={20}
                  />
                  <ActionButton
                    disabled={!canSubmit || isUploading}
                    onClick={() => {
                      submit();
                    }}
                  >
                    保存する
                  </ActionButton>
                  <CancelButton
                    disabled={isUploading}
                    onClick={() => {
                      setIsEditing(false);
                    }}
                  >
                    キャンセル
                  </CancelButton>
                </EditorToolBar>
              )}
              {!isEditing && (
                <ActionButton
                  onClick={() => {
                    if (context.auth.user.emailVerified) {
                      setIsEditing(true);
                    } else {
                      callSendEmail();
                    }
                  }}
                >
                  {context.auth.user.emailVerified
                    ? "プロフィールを編集"
                    : "本人確認メールを送信"}
                </ActionButton>
              )}
            </>
          ) : (
            <ActionButton>フォローする</ActionButton>
          )}
        </>
      )}
      {snackbar && <Snackbar {...snackbar} />}
    </HeadingContainer>
  );
};

export default UserHeader;
