import { FC } from "react";
import { useRouter } from "next/router";
import StoryComponent from "~/components/storycomponent";
import { Content } from "~/pages/users/[userid]/stories/[storyid]";
import styled from "styled-components";
import PrimaryLink from "~/components/primarylink";
import Link from "next/link";

export interface Props {
  content: Content;
}

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-self: center;
  width: 100%;
  box-sizing: border-box;
  > * {
    max-width: 720px;
  }
`;

const EditLink = styled(PrimaryLink)`
  position: fixed;
  bottom: 20px;
  right: 20px;
`;

const Details: FC<Props> = ({ content }) => {
  const query = useRouter().query;
  return (
    <Container>
      <StoryComponent
        {...content}
        createTime={content.displayTime}
        displayUser={true}
      />
      <Link
        href={{
          pathname: "/users/[userid]/stories/[storyid]/edit",
          query: query,
        }}
        passHref
      >
        <EditLink>編集する</EditLink>
      </Link>
    </Container>
  );
};

export default Details;
