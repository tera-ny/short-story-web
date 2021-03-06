import { VFC } from "react";
import Link from "next/link";
import styled from "styled-components";
import PrimaryLink from "~/components/primarylink";

const Wrapper = styled.div`
  margin-left: 20px;
  border-bottom: thin solid rgba(0, 0, 0, 0.5);
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  @media screen and (min-width: 0) and (max-width: 719px) {
    padding-bottom: 10px;
    padding-top: 10px;
  }
  @media screen and (min-width: 720px) {
    padding-bottom: 20px;
  }
`;

const TitleLink = styled.div`
  color: black;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  @media screen and (min-width: 0) and (max-width: 339px) {
    font-size: 16px;
  }
  @media screen and (min-width: 340) and (max-width: 719px) {
    font-size: 22px;
  }
  @media screen and (min-width: 720px) {
    font-size: 38px;
  }
`;

const Login = styled.a`
  color: black;
  font-weight: 100;
  text-decoration: none;
  cursor: pointer;
  border-radius: 8px;
  padding: 5px 20px;
  @media screen and (min-width: 0) and (max-width: 339px) {
    display: none;
  }
  @media screen and (min-width: 340) and (max-width: 719px) {
    font-size: 16px;
  }
  @media screen and (min-width: 720px) {
    font-size: 20px;
  }
`;

const PostLink = styled(PrimaryLink)`
  margin-right: 20px;
  font-size: 13px;
  @media screen and (max-width: 339px) {
    display: none;
  }
  @media screen and (min-width: 340px) and (max-width: 719px) {
    padding: 5px 12px;
  }
  @media screen and (min-width: 720px) {
    padding: 10px 24px;
  }
`;

const Header: VFC = () => {
  return (
    <header>
      <Wrapper>
        <Link href="/">
          <a>
            <TitleLink>short-story.space</TitleLink>
          </a>
        </Link>
      </Wrapper>
    </header>
  );
};

export default Header;
