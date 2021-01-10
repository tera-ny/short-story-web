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
import { createUser } from "~/modules/firebase";
import { Context } from "~/modules/auth";
import UserForm from "~/components/userform";

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

const Login: FC = () => {
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();
  const authContext = useContext(Context);
  const callCreateUser = useCallback(
    async (email: string, password: string) => {
      if (
        isCreating === false &&
        authContext.uid === undefined &&
        authContext.subscribed
      ) {
        setIsCreating(true);
        await createUser(email, password);
        setIsCreating(false);
      }
    },
    [isCreating, authContext.uid, authContext.subscribed]
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
    if (context.uid && !isCreating) {
      if (path && as) {
        router.push(path, as);
      } else if (path) {
        router.push(path);
      } else {
        router.push("/");
      }
    }
  }, [path, as, router, context.uid, isCreating]);
  return (
    <Context.Consumer>
      {(state) =>
        !state.uid && state.subscribed ? (
          <Container>
            <Title>short-story.spaceアカウントを作成する</Title>
            <UserForm
              isSubmitting={isCreating}
              submitText={"アカウントを作成"}
              submit={callCreateUser}
            />
          </Container>
        ) : (
          <></>
        )
      }
    </Context.Consumer>
  );
};

export default Login;
