import { NextPage, GetServerSideProps } from "next";
import Header from "~/components/header";
import EditorTemplate from "~/template/edit";

interface Props {
  id: string;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const id = context.query.storyid;
  if (typeof id === "string") {
    return { props: { id } };
  } else {
    return { notFound: true };
  }
};

const Edit: NextPage<Props> = ({ id }) => {
  return (
    <>
      <Header />
      <main>
        <EditorTemplate id={id} />
      </main>
    </>
  );
};

export default Edit;
