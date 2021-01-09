import { FC, useCallback, useState } from "react";
import Indicator from "~/components/indicator";
import InputForm from "~/components/inputform";
import styled from "styled-components";

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

const FormIndicator = styled(Indicator)`
  justify-self: center;
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
  isSigningIn: boolean;
  signIn: (email: string, password: string) => void;
}

const UserForm: FC<Props> = (props) => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const signIn = useCallback(() => {
    props.signIn(email, password);
  }, [email, password, props.signIn]);
  return (
    <Form>
      <FormIndicator visible={props.isSigningIn} width={30} height={30} />
      <InputForm title={"メールアドレス"} type="email" changeValue={setEmail} />
      <InputForm
        title={"パスワード"}
        type="password"
        changeValue={setPassword}
      />
      <Button disabled={props.isSigningIn} onClick={signIn}>
        ログイン
      </Button>
    </Form>
  );
};

export default UserForm;
