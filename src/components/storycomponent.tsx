import { FC } from "react";
import styled from "styled-components";
import Link from "next/link";

export interface Content {
  id: string;
  title: string;
  body: string;
  createTime: string;
}

const StoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  display: grid;
  box-sizing: border-box;
  padding: 10px 10px 40px;
  @media screen and (min-width: 0) and (max-width: 719px) {
    align-self: stretch;
  }
  @media screen and (min-width: 720px) {
    align-self: center;
  }
`;

const Title = styled.h3`
  margin: 0;
  font-weight: 500;
  > a {
    color: black;
    text-decoration: solid;
  }
  @media screen and (min-width: 0) and (max-width: 719px) {
    padding: 8px 0;
    font-size: 20px;
    text-align: left;
  }
  @media screen and (min-width: 720px) {
    padding: 18px 0;
    font-size: 24px;
    text-align: center;
  }
`;

const Body = styled.p`
  white-space: pre-wrap;
  font-weight: 300;
  line-height: 230%;
  margin: 0;
  @media screen and (min-width: 0) and (max-width: 719px) {
    font-size: 14px;
    text-align: left;
  }
  @media screen and (min-width: 720px) {
    font-size: 16px;
    text-align: center;
  }
`;

const User = styled.a`
  color: rgba(0, 0, 0, 0.8);
  text-decoration: none;
  box-sizing: border-box;
  @media screen and (min-width: 0) and (max-width: 719px) {
    text-align: right;
    align-self: flex-end;
  }
  @media screen and (min-width: 720px) {
    text-align: center;
    align-self: center;
  }
`;

const TimeStamp = styled.p`
  align-self: center;
  @media screen and (min-width: 0) and (max-width: 719px) {
    text-align: right;
  }
  @media screen and (min-width: 720px) {
    text-align: center;
  }
`;

const StoryComponent: FC<
  { user: { id: string; name: string }; displayUser?: boolean } & Content
> = (props) => {
  return (
    <StoryContainer>
      <Title>
        <Link href={`/users/${props.user.id}/stories/${props.id}`}>
          <a>{props.title}</a>
        </Link>
      </Title>
      <Body>{props.body}</Body>
      {props.displayUser && (
        <Link href={`/users/${props.user.id}`} passHref>
          <User>{props.user.name}</User>
        </Link>
      )}
      <TimeStamp>{props.createTime}</TimeStamp>
    </StoryContainer>
  );
};

export default StoryComponent;
