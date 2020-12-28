import { FC, useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import InputForm from "~/components/inputform";
import { useRouter } from "next/router";
import { firebaseApp } from "~/modules/firebase";
import Indicator from "~/components/indicator";
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
  @media screen and (min-width: 720px) {
    padding-bottom: 20px;
  }
`;

const Form = styled.div`
  display: grid;
  gap: 30px;
  width: 100%;
  max-width: 600px;
  > * {
    grid-column: 1;
  }
  > button {
    justify-self: center;
  }
`;

interface FormIndicatorProps {
  hidden: boolean;
}

const FormIndicator = styled(Indicator)<FormIndicatorProps>`
  justify-self: center;
  visibility: ${(p) => (p.hidden ? "hidden" : "visible")};
`;

const Button = styled.button`
  outline: none;
  border: none;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  height: 45px;
`;

const SignedIn = styled.div`
  justify-self: center;
  a {
    color: rgba(0, 0, 0, 0.8);
  }
`;
const Login: FC = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isSigningIn, setIsSigninIn] = useState(false);
  const [uid, setUserID] = useState<string>();
  const router = useRouter();
  useEffect(() => {
    setUserID(firebaseApp().auth().currentUser?.uid);
    firebaseApp()
      .auth()
      .onAuthStateChanged((user) => {
        setUserID(user?.uid);
      });
  });
  const signIn = useCallback(async () => {
    if (!isSigningIn) {
      setIsSigninIn(true);
      //Todo error handling
      await firebaseApp().auth().signInWithEmailAndPassword(email, password);
      setIsSigninIn(false);
      router.push("/");
    }
  }, [email, password, isSigningIn]);
  return (
    <Container>
      <Title>short-story.spaceにログイン</Title>
      <Form>
        {!uid && (
          <>
            <FormIndicator hidden={!isSigningIn} width={30} height={30} />
            <InputForm
              title={"メールアドレス"}
              type="email"
              changeValue={setEmail}
            />
            <InputForm
              title={"パスワード"}
              type="password"
              changeValue={setPassword}
            />
            <Button disabled={isSigningIn} onClick={signIn}>
              ログイン
            </Button>
          </>
        )}
        {uid && (
          <>
            <SignedIn>サイン済みです</SignedIn>
            <SignedIn>{`UserID: ${uid}`}</SignedIn>
            <SignedIn>
              <Link href="/">
                <a>トップページへ</a>
              </Link>
            </SignedIn>
          </>
        )}
      </Form>
    </Container>
  );
};

export default Login;
