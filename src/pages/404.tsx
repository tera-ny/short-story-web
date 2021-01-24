import { NextPage } from "next";
import Header from "~/components/header";
import styled from "styled-components";
import { Context } from "~/modules/auth";

const Container = styled.div`
  padding: 20px;
`;

const Notfound: NextPage = () => (
  <>
    <Header />
    <main>
      <Container>
        <h1>ページが見つかりませんでした、、。</h1>
        <p>
          このページはすでに削除されているか、URLが変更された可能性があります。
        </p>
        <Context.Consumer>
          {(state) =>
            state.subscribed &&
            !state.subscribed.user && (
              <p>
                心当たりが無い場合お手数ですがログインを行い、再度ページの確認をお願いします。
              </p>
            )
          }
        </Context.Consumer>
        <h4>short-story.space 運営</h4>
      </Container>
    </main>
  </>
);

export default Notfound;
