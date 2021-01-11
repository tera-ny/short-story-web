import { FC } from "react";
import { Props } from "~/pages/users/[userid]";
import StoryComponent from "~/components/storycomponent";
import styled from "styled-components";
import Header from "~/components/userheader";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionHeader = styled.h4`
  margin: 0;
  font-weight: 100;
  align-self: center;
`;

const Contents = styled.div`
  max-width: 600px;
  width: 100%;
  padding: 0 10px 70px;
  box-sizing: border-box;
`;

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
