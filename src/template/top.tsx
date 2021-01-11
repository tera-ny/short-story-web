import { FC } from "react";
import styled from "styled-components";
import Heading from "~/components/heading";
import StoryComponent from "~/components/storycomponent";
import { Content } from "~/pages";

interface Props {
  contents: Content[];
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 720px;
  padding: 0 20px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  margin-top: 30px;
`;

const NotFound = styled.div`
  margin: 100px auto 0;
`;

const Template: FC<Props> = (props) => (
  <Container>
    <Heading>新着のお話</Heading>
    {props.contents &&
      props.contents.map((content, index) => (
        <StoryComponent {...content} key={index} displayUser={true} />
      ))}
    {!props.contents && <NotFound>お話がありません</NotFound>}
  </Container>
);

export default Template;
