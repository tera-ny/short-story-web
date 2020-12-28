import { VFC } from "react";
import Link from "next/link";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-left: 20px;
  border-bottom: thin solid rgba(0, 0, 0, 0.5);
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const TitleLink = styled.div`
  color: black;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  @media screen and (min-width: 0) and (max-width: 719px) {
    font-size: 22px;
  }
  @media screen and (min-width: 720px) {
    font-size: 38px;
  }
`;

const Login = styled.div`
  color: black;
  font-weight: 100;
  text-decoration: none;
  cursor: pointer;
  border-radius: 8px;
  padding: 0 10px;
  @media screen and (min-width: 0) and (max-width: 719px) {
    font-size: 16px;
  }

  @media screen and (min-width: 720px) {
    font-size: 20px;
  }
`;

const Header: VFC = () => (
  <header>
    <Wrapper>
      <Link href="/">
        <a>
          <TitleLink>short-story.space</TitleLink>
        </a>
      </Link>
      <Link href="/login">
        <a>
          <Login>ログイン</Login>
        </a>
      </Link>
    </Wrapper>
  </header>
);

export default Header;
