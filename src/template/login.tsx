import { FC, useState, useCallback, useEffect, useContext } from "react";
import styled from "styled-components";
import InputForm from "~/components/inputform";
import { useRouter } from "next/router";
import { firebaseApp } from "~/modules/firebase";
import Indicator from "~/components/indicator";
import { Context } from "~/modules/auth";

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

interface Props {
  path?: string;
  as?: string;
}

const Login: FC<Props> = (props) => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isSigningIn, setIsSigninIn] = useState(false);
  const router = useRouter();
  const signIn = useCallback(async () => {
    if (!isSigningIn) {
      setIsSigninIn(true);
      //Todo error handling
      await firebaseApp().auth().signInWithEmailAndPassword(email, password);
      setIsSigninIn(false);
    }
  }, [email, password, isSigningIn]);
  const context = useContext(Context);
  useEffect(() => {
    const path = props.path ?? router.query.redirect_to_path;
    const as = props.as ?? router.query.redirect_to_as;
    console.log(path, as);
    if (context.uid && context.subscribed) {
      if (typeof path === "string" && typeof as === "string") {
        router.push(path, as);
      } else if (typeof path === "string") {
        router.push(path);
      } else {
        router.push("/");
      }
    }
  }, [context, router.query]);
  return (
    <Context.Consumer>
      {(state) =>
        !state.uid && state.subscribed ? (
          <Container>
            <Title>short-story.spaceにログイン</Title>
            <Form>
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
            </Form>
          </Container>
        ) : (
          <></>
        )
      }
    </Context.Consumer>
  );
};

export default Login;
