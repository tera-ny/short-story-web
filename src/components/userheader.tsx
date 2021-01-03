import styled from "styled-components";
import { FC, useState, useContext } from "react";
import PrimaryButton from "~/components/primarybutton";
import { Context } from "~/modules/auth";
import ProfileEditor from "~/components/profileeditor";

const ProfileContainer = styled.div`
  display: grid;
  row-gap: 20px;
  justify-content: stretch;
  width: 200px;
  > img {
    height: 100px;
    width: 100px;
    object-fit: contain;
    border-radius: 50px;
    justify-self: center;
  }
  > h1 {
    font-size: 24px;
    font-weight: 500;
    text-align: center;
    margin: 0;
  }
`;

const ActionButton = styled(PrimaryButton)`
  font-weight: 500;
  width: 180px;
  padding: 10px 20px;
  justify-self: center;
`;

const HeadingContainer = styled.div`
  display: grid;
  row-gap: 40px;
  padding: 100px 0;
  justify-content: center;
`;

interface HeadingProps {
  name: string;
  icon?: string;
}

interface Content {
  name: string;
  icon: string;
}

const UserHeader: FC<HeadingProps> = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [user, setUser] = useState();
  const context = useContext(Context);
  return (
    <HeadingContainer>
      <ProfileContainer>
        <img src={props.icon ?? "/images/user-icon.svg"} alt="" />
        {isEdit && context.uid ? (
          <>
            <ProfileEditor uid={context.uid} />
          </>
        ) : (
          <>
            <h1>{props.name}</h1>
          </>
        )}
      </ProfileContainer>
      {context.subscribed && (
        <>
          {context.uid && (
            <>
              <ActionButton
                onClick={() => {
                  setIsEdit(!isEdit);
                }}
              >
                {isEdit ? "編集を終了する" : "プロフィールを編集"}
              </ActionButton>
            </>
          )}
          {!context.uid && <ActionButton>フォローする</ActionButton>}
        </>
      )}
    </HeadingContainer>
  );
};

export default UserHeader;
