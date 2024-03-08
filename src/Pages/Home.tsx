import { useState, useEffect } from "react";
import { PostsType } from "../../store/State";
import { useRecoilValue } from "recoil";
import Signin from "../components/Signin";
import CreatePost from "../components/CreatePost";
import { Signinpopup, Createpostpopup } from "../../store/State";
import Post from "../components/Post";
import AuthorPost from "../components/AuthorPost";
import Wrapper from "../components/Wrapper";
import toast from "react-hot-toast";

type PostType = {
  _id: string;
  Title: string;
  Content: string;
  Author: { _id: string; Name: string };
  Comments: [];
  Likes: [];
};

const Home = () => {
  const [Postsdata, setPostsdata] = useState<PostType[]>([]);
  const signinpop = useRecoilValue(Signinpopup);
  const createpostpop = useRecoilValue(Createpostpopup);
  const Posttype = useRecoilValue(PostsType);
  const fetchdata = async () => {
    try {
      let uri;
      let response;
      if (Posttype === 1) {
        uri = "https://social-backend-one.vercel.app/post/mypost";
        response = await fetch(uri, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
        setTimeout(() => {
          toast.success(
            "Please Click on tiltle or content to update the post",
            {
              duration: 5000,
            }
          );
        }, 1000);
      } else {
        uri = "https://social-backend-one.vercel.app/post/allpost";
        response = await fetch(uri);
      }
      const data = await response.json();
      setPostsdata(data.posts);
      console.log(data);
    } catch (error) {
      toast.error("Error in fetching data");
    }
  };

  useEffect(() => {
    fetchdata();
  }, [Posttype]);

  return (
    <div>
      {signinpop && <Signin />}
      {createpostpop && <CreatePost />}
      <Wrapper>
        <div className="grid mt-[5vh] md:grid-cols-3 gap-2">
          {Postsdata && Postsdata.length > 0 ? (
            Postsdata.map((post: PostType) =>
              Posttype === 1 ? <AuthorPost data={post} /> : <Post data={post} />
            )
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </Wrapper>
    </div>
  );
};

export default Home;
