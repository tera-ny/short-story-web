import { FC } from "react";
import styled from "styled-components";
import { Story as Props } from "~/modules/entity";

const Title = styled.h3`
  font-weight: 500;
  font-size: 28px;
  margin: 36px 0 28px;
`;

const Body = styled.p`
  font-weight: 300;
  font-size: 16px;
  line-height: 200%;
  margin: 0;
  @media screen and (min-width: 0) and (max-width: 719px) {
    text-align: left;
  }
  @media screen and (min-width: 720px) {
    text-align: center;
    white-space: pre-wrap;
  }
`;

const Author = styled.p`
  font-weight: 100;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.5);
  width: 100%;
  text-align: right;
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
    <Author>著 • {props.author}</Author>
  </Container>
);

export default StoryComponent;
