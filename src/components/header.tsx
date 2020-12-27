import { VFC } from "react";
import Link from "next/link";
import styled from "styled-components";
import { OnlyMobile, OnlyPC } from "~/components/utils/responsive";

const Wrapper = styled.div`
  margin-left: 20px;
  border-bottom: thin solid rgba(0, 0, 0, 0.5);
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
  @media screen and (min-width: 0) and (max-width: 719px) {
    align-items: center;
  }
  @media screen and (min-width: 720px) {
    align-items: flex-end;
  }
`;

const TitleLink = styled.div`
  color: black;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  @media screen and (min-width: 0) and (max-width: 719px) {
    font-size: 24px;
  }
  @media screen and (min-width: 720px) {
    font-size: 36px;
  }
`;

const Login = styled.div`
  color: black;
  font-weight: 100;
  text-decoration: none;
  font-size: 20px;
  cursor: pointer;
  border-radius: 8px;
  padding: 0 10px;
  @media screen and (min-width: 0) and (max-width: 719px) {
    height: 45px;
    width: 45px;
    object-fit: cover;
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
          <Login>
            <OnlyPC>ログイン</OnlyPC>
            <OnlyMobile>
              <img src="/images/user-circle.svg" alt="" />
            </OnlyMobile>
          </Login>
        </a>
      </Link>
    </Wrapper>
  </header>
);

export default Header;
