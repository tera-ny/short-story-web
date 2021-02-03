import { FC } from "react";
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

const User: FC = (props) => {
  return (
    <Container>
      <SectionHeader>新しいお話</SectionHeader>
      <Contents></Contents>
    </Container>
  );
};

export default User;
