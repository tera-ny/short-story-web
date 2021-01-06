import { VFC } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Context } from "~/modules/auth";
import PrimaryLink from "~/components/primarylink";
import { useRouter } from "next/router";

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
  padding: 10px 24px;
  font-size: 13px;
  @media screen and (max-width: 339px) {
    display: none;
  }
`;

const Header: VFC = () => {
  const router = useRouter();
  return (
    <header>
      <Wrapper>
        <Link href="/">
          <a>
            <TitleLink>short-story.space</TitleLink>
          </a>
        </Link>
        <Context.Consumer>
          {(state) => (
            <>
              {!state.uid && state.subscribed && (
                <Link
                  href={{
                    pathname: "/login",
                    query: {
                      redirect_to_path: router.asPath,
                    },
                  }}
                  passHref
                >
                  <Login>ログイン</Login>
                </Link>
              )}
              {state.uid && router.pathname !== "/new" && (
                <Link href="/new" passHref>
                  <PostLink>投稿する</PostLink>
                </Link>
              )}
            </>
          )}
        </Context.Consumer>
      </Wrapper>
    </header>
  );
};

export default Header;
