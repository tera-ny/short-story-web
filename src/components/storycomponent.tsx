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
  padding: 20px 0 40px;
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
  text-align: left;
  > a {
    color: black;
    text-decoration: solid;
  }
  @media screen and (min-width: 0) and (max-width: 719px) {
    padding: 8px 5px 0;
    font-size: 20px;
  }
  @media screen and (min-width: 720px) {
    padding: 18px 5px 0;
    font-size: 24px;
  }
`;

const Separator = styled.hr`
  width: 100%;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  @media screen and (min-width: 0) and (max-width: 719px) {
    margin: 4px 0;
  }
  @media screen and (min-width: 720px) {
    margin: 8px 0;
  }
`;

const Body = styled.p`
  white-space: pre-wrap;
  font-weight: 300;
  line-height: 230%;
  margin: 0;
  padding: 30px 5px;
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
  text-align: right;
  justify-self: flex-end;
`;

const TimeStamp = styled.p`
  align-self: center;
  text-align: right;
  justify-self: flex-end;
  margin: 0;
  padding-top: 5px;
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
      <Separator />
      <Body>{props.body}</Body>
      {props.displayUser && (
        <Link href={`/users/${props.user.id}`} passHref>
          <User>著 • {props.user.name}</User>
        </Link>
      )}
      <TimeStamp>{props.createTime}</TimeStamp>
    </StoryContainer>
  );
};

export default StoryComponent;
