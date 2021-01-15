import styled from "styled-components";
import { FC, useState, useContext, useCallback, useMemo } from "react";
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

const NameStyle = css`
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  margin: 0;
`;

const AboutMeStyle = css`
  font-weight: 300;
  margin: 0;
  text-align: center;
`;

const Name = styled.h1`
  ${NameStyle}
`;

const AboutMe = styled.p`
  ${AboutMeStyle}
  max-width: 500px;
  padding: 10px 20px 0;
  font-size: 13px;
  line-height: 180%;
  white-space: pre-wrap;
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
  @media screen and (min-width: 0) and (max-width: 499px) {
    width: 120px;
  }
  @media screen and (min-width: 500px) {
    width: 160px;
  }
`;

const NameInput = styled.input`
  outline: none;
  border: none;
  ${NameStyle}
`;

const AboutMeTextArea = styled.textarea`
  outline: none;
  border: none;
  resize: none;
  height: 60px;
  width: 100%;
  max-width: 500px;
  font-size: 16px;
  ${AboutMeStyle}
`;

const UploadIndicator = styled(Indicator)`
  justify-self: center;
  padding-top: 10px;
`;

interface HeadingContainerProps {
  isEditing: boolean;
}

const HeadingContainer = styled.div<HeadingContainerProps>`
  display: grid;
  row-gap: ${(p) => (p.isEditing ? "20px" : "52px")};
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
      } catch (e) {
        console.error(e);
        setIsUploading(false);
      }
    }
  }, [editingName, editingAboutMe, context.auth]);

  const callSendEmail = useCallback(async () => {
    await sendEmailVerification();
  }, []);

  const hasNameDifference = useMemo(() => {
    return props.name !== editingName;
  }, [props.name, editingName]);
  const hasAboutMeDifference = useMemo(() => {
    return props.aboutMe !== editingAboutMe;
  }, [props.aboutMe, editingAboutMe]);
  const canSubmit = useMemo(() => 0 < editingName.length, [editingName]);
  return (
    <HeadingContainer isEditing={isEditing}>
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
                setEditingName(e.target.value);
              }}
            />
            <AboutMeTextArea
              value={editingAboutMe}
              onChange={(e) => {
                setEditingAboutMe(e.target.value);
              }}
            ></AboutMeTextArea>
            <UploadIndicator visible={isUploading} width={20} height={20} />
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
              <ActionButton
                onClick={() => {
                  if (
                    isEditing &&
                    (hasNameDifference || hasAboutMeDifference)
                  ) {
                    submit();
                  } else if (context.auth.user.emailVerified) {
                    setIsEditing(!isEditing);
                  } else {
                    callSendEmail();
                  }
                }}
                disabled={(!canSubmit && isEditing) || isUploading}
              >
                {isEditing
                  ? hasNameDifference || hasAboutMeDifference
                    ? "保存して編集を終了する"
                    : "編集を終了する"
                  : context.auth.user.emailVerified
                  ? "プロフィールを編集"
                  : "本人確認メールを送信"}
              </ActionButton>
            </>
          ) : (
            <ActionButton>フォローする</ActionButton>
          )}
        </>
      )}
    </HeadingContainer>
  );
};

export default UserHeader;
