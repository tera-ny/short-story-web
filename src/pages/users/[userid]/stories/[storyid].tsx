import { useRouter } from "next/router";
import { NextPage } from "next";

const Story: NextPage = () => {
  const query = useRouter().query;
  return (
    <div>
      {query.userid} + {query.storyid}
    </div>
  );
};

export default Story;
