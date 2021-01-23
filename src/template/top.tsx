import { FC, useContext, useEffect } from "react";
import styled from "styled-components";
import Heading from "~/components/heading";
import StoryComponent from "~/components/storycomponent";
import { Content } from "~/pages";
import Context from "~/modules/auth/context";
import { firebaseApp } from "~/modules/firebase";
import { SearchKeyAPIResponse } from "~/modules/entity";

interface Props {
  contents: Content[];
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 720px;
  padding: 0 20px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  margin-top: 30px;
`;

const NotFound = styled.div`
  margin: 100px auto 0;
`;

const fetchSearchKey = async (): Promise<SearchKeyAPIResponse> => {
  const token = await firebaseApp().auth().currentUser.getIdToken();
  const uid = firebaseApp().auth().currentUser.uid;
  const result = await fetch("/api/algolia/searchkey", {
    headers: new Headers({
      Authorization: `${uid} ` + token,
    }),
  }).then((result) => result?.json());
  return result as SearchKeyAPIResponse;
};

const Template: FC<Props> = (props) => {
  const context = useContext(Context);
  useEffect(() => {
    const user = context.auth?.user;
    if (user) {
      fetchSearchKey().then((result) => {
        console.log(result);
      });
    }
  }, [context.auth?.user]);
  return (
    <Container>
      <Heading>新着のお話</Heading>
      {props.contents &&
        props.contents.map((content, index) => (
          <StoryComponent {...content} key={index} displayUser={true} />
        ))}
      {!props.contents && <NotFound>お話がありません</NotFound>}
    </Container>
  );
};

export default Template;
