import { FC } from "react";
import { useRouter } from "next/router";
import StoryComponent from "~/components/story";
import { Story } from "~/modules/entity";
import styled from "styled-components";
import PrimaryLink from "~/components/primaryLink";
import Link from "next/link";

export interface Props {
  item?: Pick<Story, "title" | "body">;
}

const Container = styled.div`
  padding: 20px;
  display: grid;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 20px;
  box-sizing: border-box;
  > * {
    grid-column: 1/ 3;
    max-width: 720px;
  }
  > div {
    justify-self: center;
  }
`;

const EditLink = styled(PrimaryLink)`
  grid-column: 2 / 3;
`;

const Details: FC<Props> = ({ item }) => {
  const query = useRouter().query;
  return (
    <Container>
      <StoryComponent {...item} />
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
