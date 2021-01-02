import { FC } from "react";
import styled from "styled-components";
import { Story } from "~/modules/entity";

type Props = Pick<Story, "title" | "body">;

const Title = styled.h3`
  font-weight: 500;
  font-size: 28px;
  margin: 36px 0 28px;
  width: 100%;
  @media screen and (min-width: 0) and (max-width: 719px) {
    text-align: left;
  }
  @media screen and (min-width: 720px) {
    text-align: center;
  }
`;

const Body = styled.p`
  font-weight: 300;
  font-size: 16px;
  line-height: 200%;
  margin: 0;
  white-space: pre-wrap;
  @media screen and (min-width: 0) and (max-width: 719px) {
    text-align: left;
  }
  @media screen and (min-width: 720px) {
    text-align: center;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StoryComponent: FC<Props> = (props) => (
  <Container>
    <Title>{props.title}</Title>
    <Body>{props.body}</Body>
  </Container>
);

export default StoryComponent;
