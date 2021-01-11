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
import { createUser, firebaseApp } from "~/modules/firebase";
import { Context } from "~/modules/auth";
import UserForm from "~/components/userform";
import Link from "next/link";
import firebase from "firebase/app";
import "firebase/auth";
import { generateMessage } from "~/modules/auth/error";

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
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string>();
  const router = useRouter();
  const authContext = useContext(Context);
  const callCreateUser = useCallback(
    async (email: string, password: string) => {
      if (
        isCreating === false &&
        authContext.auth &&
        authContext.auth.user === undefined
      ) {
        setIsCreating(true);
        setError(undefined);
        let credential: firebase.auth.UserCredential;
        try {
          credential = await firebaseApp()
            .auth()
            .createUserWithEmailAndPassword(email, password);
          await credential.user.sendEmailVerification();
        } catch (error) {
          setIsCreating(false);
          setError(generateMessage(error));
          return;
        }
        await createUser(credential);
        setIsCreating(false);
      }
    },
    [isCreating, authContext.auth]
  );
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
    if (authContext.auth && !isCreating) {
      if (path && as) {
        router.push(path, as);
      } else if (path) {
        router.push(path);
      } else {
        router.push("/");
      }
    }
  }, [path, as, router, authContext.auth, isCreating]);
  return (
    <Context.Consumer>
      {(state) =>
        state.auth &&
        !state.auth.user && (
          <Container>
            <Title>short-story.spaceアカウントを作成する</Title>
            <UserForm
              isSubmitting={isCreating}
              submitText={"アカウントを作成"}
              submit={callCreateUser}
              error={error}
            />
            <p>
              ログインは
              <Link href={"/login"} passHref>
                <a>こちら</a>
              </Link>
              ！
            </p>
          </Container>
        )
      }
    </Context.Consumer>
  );
};

export default Login;
