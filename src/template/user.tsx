import { FC, useContext } from "react";

import { Props, Content as StoryContent } from "~/pages/users/[userid]";
import Link from "next/link";
import styled from "styled-components";
import PrimaryButton from "~/components/primarybutton";
import PrimaryLink from "~/components/primaryLink";
import { Context } from "~/modules/auth";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StoryContainer = styled(Container)`
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  padding: 10px 0 40px;
  > h3 {
    margin: 0;
    padding: 18px 0;
    font-size: 28px;
    font-weight: 500;
    > a {
      color: black;
      text-decoration: solid;
    }
  }
`;

const Body = styled.p`
  white-space: pre-wrap;
  font-weight: 300;
  line-height: 200%;
`;

const TimeStamp = styled.p`
  align-self: center;
  text-align: center;
`;

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

const EditLink = styled(PrimaryLink)`
  font-weight: 500;
  width: 150px;
  justify-self: center;
  font-size: 13px;
  text-align: center;
`;

const ActionButton = styled(PrimaryButton)`
  font-weight: 500;
  width: 150px;
  justify-self: center;
`;

const HeadingContainer = styled.div`
  display: grid;
  row-gap: 40px;
  padding: 100px 0;
  justify-content: center;
  grid-template-rows: 1fr 40px;
  > button {
    font-weight: 500;
    width: 150px;
    justify-self: center;
  }
`;

const SectionHeader = styled.h4`
  margin: 0;
  font-weight: 100;
`;

const Contents = styled.div`
  max-width: 700px;
  width: 100%;
  padding-bottom: 70px;
  > :not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  }
`;

interface HeadingProps {
  name: string;
}

const Heading: FC<HeadingProps> = (props) => {
  const context = useContext(Context);
  return (
    <HeadingContainer>
      <ProfileContainer>
        <img src="/images/user-icon.svg" alt="" />
        <h1>{props.name}</h1>
      </ProfileContainer>
      {context.subscribed &&
        (context.uid ? (
          <Link href={`/users/${context.uid}/edit`} passHref>
            <EditLink>プロフィールを編集</EditLink>
          </Link>
        ) : (
          <ActionButton>フォローする</ActionButton>
        ))}
    </HeadingContainer>
  );
};

const StoryComponent: FC<{ user: { id: string } } & StoryContent> = (props) => {
  return (
    <StoryContainer>
      <h3>
        <Link href={`/users/${props.user.id}/stories/${props.id}`}>
          <a>{props.title}</a>
        </Link>
      </h3>
      <Body>{props.body}</Body>
      <TimeStamp>{props.createTime}</TimeStamp>
    </StoryContainer>
  );
};
const User: FC<Props> = (props) => {
  return (
    <Container>
      <Heading {...props.user} />
      <SectionHeader>新しいお話</SectionHeader>
      <Contents>
        {props.user &&
          props.contents.map((content, index) => {
            return (
              <StoryComponent key={index} user={props.user} {...content} />
            );
          })}
      </Contents>
    </Container>
  );
};

export default User;
