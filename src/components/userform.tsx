import { FC, useCallback, useMemo, useState } from "react";
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
  cursor: pointer;
  :disabled {
    background-color: rgba(38, 38, 38, 0.8);
    color: rgb(228, 227, 227);
    cursor: default;
  }
`;

const Error = styled.p`
  margin: 0;
  color: rgb(243, 59, 59);
  font-weight: 300;
  justify-self: center;
  height: 20px;
  font-size: 15px;
`;

const SubContent = styled.div`
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface Props {
  isSubmitting: boolean;
  submitText: string;
  submit: (email: string, password: string) => void;
  validEmail?: (email: string) => boolean;
  validPassword?: (password: string) => boolean;
  error?: string;
}

const UserForm: FC<Props> = ({
  isSubmitting,
  submitText,
  submit,
  validEmail,
  validPassword,
  error,
}) => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const onSubmit = useCallback(() => {
    submit(email, password);
  }, [email, password, submit]);
  const validate = useMemo(() => {
    return (
      (validEmail ? validEmail(email) : true) &&
      (validPassword ? validPassword(password) : true)
    );
  }, [validEmail, validPassword, email, password]);
  return (
    <Form>
      <SubContent>
        {isSubmitting && (
          <FormIndicator visible={isSubmitting} width={30} height={30} />
        )}
        {error && <Error>{error}</Error>}
      </SubContent>
      <InputForm title={"メールアドレス"} type="email" changeValue={setEmail} />
      <InputForm
        title={"パスワード"}
        type="password"
        changeValue={setPassword}
      />
      <Button disabled={isSubmitting || !validate} onClick={onSubmit}>
        {submitText}
      </Button>
    </Form>
  );
};

export default UserForm;
