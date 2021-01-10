import {
  FC,
  useState,
  useCallback,
  useEffect,
  useContext,
  useMemo,
} from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { firebaseApp } from "~/modules/firebase";
import { Context } from "~/modules/auth";
import UserForm from "~/components/userform";
import Link from "next/link";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  display: flex;
  margin: 0;
  @media screen and (min-width: 0) and (max-width: 719px) {
    font-size: 18px;
    font-weight: 500;
    padding: 24px 0 18px;
  }
  @media screen and (min-width: 720px) {
    font-size: 24px;
    font-weight: 700;
    padding: 20px 0 28px;
  }
`;

const Login: FC = () => {
  const [isSigningIn, setIsSigninIn] = useState(false);
  const router = useRouter();
  const signIn = useCallback(
    async (email: string, password: string) => {
      if (!isSigningIn) {
        setIsSigninIn(true);
        //Todo error handling
        await firebaseApp().auth().signInWithEmailAndPassword(email, password);
        setIsSigninIn(false);
      }
    },
    [isSigningIn]
  );
  const context = useContext(Context);
  const [path, as] = useMemo(() => {
    const query = router.query;
    const path = query.redirect_to_path;
    const as = query.redirect_to_as;
    return [
      typeof path === "string" ? path : undefined,
      typeof as === "string" ? as : undefined,
    ];
  }, [router.query]);
  useEffect(() => {
    console.log(path, as);
    if (context.uid) {
      if (path && as) {
        router.push(path, as);
      } else if (path) {
        router.push(path);
      } else {
        router.push("/");
      }
    }
  }, [path, as, router, context.uid]);
  return (
    <Context.Consumer>
      {(state) =>
        !state.uid && state.subscribed ? (
          <Container>
            <Title>short-story.spaceにログイン</Title>
            <UserForm
              isSubmitting={isSigningIn}
              submitText={"ログイン"}
              submit={signIn}
            />
            <p>
              アカウント登録は
              <Link href={"/register"} passHref>
                <a>こちら</a>
              </Link>
              ！
            </p>
          </Container>
        ) : (
          <></>
        )
      }
    </Context.Consumer>
  );
};

export default Login;
