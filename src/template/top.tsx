import { FC } from "react";
import styled from "styled-components";
import Heading from "~/components/heading";
import StoryItem from "~/components/story";
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

const Items = styled.div`
  > :not(:last-child) {
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.5);
  }
`;

const Template: FC<Props> = (props) => (
  <Container>
    <Heading>新着のお話</Heading>
    <Items>
      {props.contents &&
        props.contents.map((content, index) => (
          <StoryItem {...content.entity} key={index} />
        ))}
    </Items>
    {!props.contents && <NotFound>お話がありません</NotFound>}
  </Container>
);

export default Template;
