import { FC, useState, useCallback, useEffect } from "react";
import styled, { css } from "styled-components";
import InputForm from "~/components/inputform";
import { useRouter } from "next/router";
import { firebaseApp } from "~/modules/firebase";
import Indicator from "~/components/indicator";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  padding-bottom: 20px;
  display: flex;
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
  width: 400px;
  height: 45px;
`;

const Login: FC = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isSigningIn, setIsSigninIn] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (firebaseApp().auth().currentUser) {
      router.push("/");
    }
  }, [isSigningIn]);
  const signIn = useCallback(async () => {
    if (!isSigningIn) {
      setIsSigninIn(true);
      await firebaseApp().auth().signInWithEmailAndPassword(email, password);
      setIsSigninIn(false);
    }
  }, [email, password, isSigningIn]);
  return (
    <Container>
      <Title>short-story.spaceにログイン</Title>
      <Form>
        <FormIndicator hidden={!isSigningIn} width={30} height={30} />
        <InputForm
          title={"メールアドレス"}
          type="email"
          value={email}
          changeValue={setEmail}
        />
        <InputForm
          title={"パスワード"}
          type="password"
          value={password}
          changeValue={setPassword}
        />
        <Button disabled={isSigningIn} onClick={signIn}>
          ログイン
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
