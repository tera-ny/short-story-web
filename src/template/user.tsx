import { FC } from "react";
import { Props, Content as StoryContent } from "~/pages/users/[userid]";
import Link from "next/link";
import styled from "styled-components";
import Header from "~/components/userheader";

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
      <Header {...props.user} />
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
