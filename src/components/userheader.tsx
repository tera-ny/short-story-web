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
import { firebaseApp, FirestorePath } from "~/modules/firebase";
import firebase from "firebase";
import Indicator from "~/components/indicator";
import Image from "next/image";

const NameStyle = css`
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  margin: 0;
`;

const Name = styled.h1`
  ${NameStyle}
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

interface HeadingProps {
  name: string;
  icon?: string;
  id: string;
}

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
  @media screen and (min-width: 0) and (max-width: 719px) {
    padding: 60px 0 40px;
  }
  @media screen and (min-width: 720px) {
    padding: 100px 0 80px;
  }
`;

const nameInputID = "name_input";

const UserHeader: FC<HeadingProps> = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [icon, setIcon] = useState(props.icon);
  const [confirmedName, setConfirmedName] = useState(props.name);
  const [editingName, setEditingName] = useState(props.name);
  const [isUploading, setIsUploading] = useState(false);
  const context = useContext(Context);

  const submit = useCallback(async () => {
    if (editingName && context.uid) {
      try {
        setIsUploading(true);
        await firebaseApp()
          .firestore()
          .collection(FirestorePath.user)
          .doc(context.uid)
          .set(
            {
              name: editingName,
              updateTime: firebase.firestore.FieldValue.serverTimestamp(),
            },
            { merge: true }
          );
        setConfirmedName(editingName);
        setIsUploading(false);
        setIsEditing(false);
      } catch (e) {
        console.error(e);
      }
    }
  }, [editingName, context.uid]);
  const hasNameDifference = useMemo(() => {
    return confirmedName !== editingName;
  }, [confirmedName, editingName]);
  const canSubmit = useMemo(() => 0 < editingName.length, [editingName]);
  return (
    <HeadingContainer isEditing={isEditing}>
      <ProfileContainer>
        <ImageContainer>
          <Image
            key={icon}
            src={icon ?? "/images/user-icon.svg"}
            alt="icon"
            layout="responsive"
            width={200}
            height={200}
          />
          {isEditing && context.uid && (
            <>
              <ProfileIconEditor uploaded={setIcon} uid={context.uid} />
            </>
          )}
        </ImageContainer>
        {isEditing ? (
          <>
            <NameInput
              id={nameInputID}
              type="text"
              value={editingName}
              onChange={(e) => {
                setEditingName(e.target.value);
              }}
            />
            <UploadIndicator visible={isUploading} width={20} height={20} />
          </>
        ) : (
          <Name>{confirmedName}</Name>
        )}
      </ProfileContainer>
      {context.uid && (
        <>
          {context.uid === props.id ? (
            <>
              <ActionButton
                onClick={() => {
                  if (isEditing && hasNameDifference) {
                    submit();
                  } else {
                    setIsEditing(!isEditing);
                  }
                }}
                disabled={(!canSubmit && isEditing) || isUploading}
              >
                {isEditing
                  ? hasNameDifference
                    ? "保存して編集を終了する"
                    : "編集を終了する"
                  : "プロフィールを編集"}
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
