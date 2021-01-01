import { FC } from "react";
import { useRouter } from "next/router";
import StoryComponent from "~/components/story";
import { Story } from "~/modules/entity";
import styled from "styled-components";
import PrimaryLink from "~/components/primaryLink";
import Link from "next/link";

export interface Props {
  story?: Story;
}

const Container = styled.div`
  padding: 20px;
  display: grid;
  justify-content: center;
  align-items: center;
  > * {
    grid-column: 1/ 3;
    max-width: 720px;
  }
`;

const EditLink = styled(PrimaryLink)`
  grid-column: 2 / 3;
  justify-self: flex-end;
`;

const Details: FC<Props> = ({ story }) => {
  const query = useRouter().query;
  return (
    <Container>
      <StoryComponent {...story} />
      <Link
        href={{
          pathname: "/users/[userid]/stories/[storyid]/edit",
          query: query,
        }}
        prefetch
        passHref
      >
        <EditLink>編集する</EditLink>
      </Link>
    </Container>
  );
};

export default Details;
