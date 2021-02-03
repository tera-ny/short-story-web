import { FC } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import PrimaryLink from "~/components/primarylink";
import Link from "next/link";

export interface Props {}

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

const Details: FC<Props> = () => {
  const query = useRouter().query;
  return (
    <Container>
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
