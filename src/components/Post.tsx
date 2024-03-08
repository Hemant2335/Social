import { FiHeart, FiMessageCircle } from "react-icons/fi";
import Img from "../assets/Banner/PostImg.jpg";
import Avatar from "../assets/avatar.png";
import { useEffect, useState } from "react";
import { UserId, issignin , PostsType , Username } from "../../store/State";
import {  useRecoilValue, useSetRecoilState } from "recoil";
import Comment from "./Comment";
import toast from "react-hot-toast";

type ArticleCardProps = {
  data: {
    _id: string;
    Title: string;
    Content: string;
    Author: { _id: string; Name: string };
    Comments: [];
    Likes: {_id : string , Name : string}[];
  };
};

const Post = ({ data }: ArticleCardProps) => {
  const userId = useRecoilValue(UserId);
  const isSignin = useRecoilValue(issignin);
  const isUsername = useRecoilValue(Username);
  const setposttype = useSetRecoilState(PostsType);
  const [iscommentpopup, setiscommentpopup] = useState(false);
  const isliked = () => {
    console.log({_id : userId , Name: isUsername});
    console.log(data.Likes);
    const check = data.Likes.find((like) => like._id === userId);
    if (check) {
      const element = document.getElementById(data._id);
      if (element) {
        element.style.color = "red";
      }
    }
  };

  useEffect(() => {
    isliked();
  }, [isSignin]);

  const handlelike = async () => {
    try {
      const uri = `https://social-backend-one.vercel.app/intract/like`;
      const response = await fetch(uri, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          PostId: data._id,
        }),
      });
      const res = await response.json();
      if (res.Check) {
        toast.success(res.msg);
        setposttype(Math.random());
        const element = document.getElementById(data._id);
        if (element) {
          element.style.color = "red";
        }
      } else {
        toast.error("Error in liking post");
      }
    } catch (error) {
      toast.error("Error in liking post");
    }
  };

  return (
    <>
    {iscommentpopup && <Comment comments={data?.Comments} PostId={data._id} setiscommentpopup={setiscommentpopup} />}
    <div className="md:w-[20vw] h-fit rounded-lg ">
      {/* Image */}
      <div className="w-full h-[25vh]">
        <img
          src={Img}
          className="w-full rounded-lg object-cover h-full"
          alt="Image"
        />
      </div>
      <div className="p-[2vh] shadow-3xl">
        <h1 className="text-sm font-medium">Article</h1>
        <div className="flex w-full justify-between items-center">
          <h1 className="text-lg font-bold">{data.Title}</h1>
          <button
            id={data._id}
            onClick={ isSignin ? handlelike : () => toast.error("Please Signin to like the post")}
            className="text-xl bg-black relative"
          >
            <FiHeart /> <span className="text-sm">{data.Likes.length}</span>
          </button>
        </div>
        <p className="text-sm font-medium mt-[2vh]">{data.Content}</p>
        <div className="flex justify-between items-center">
          <div className="mt-[2vh] flex items-center gap-2">
            <div className="w-[6vh] h-[6vh] rounded-[50%] ">
              <img
                src={Avatar}
                className="rounded-[50%] w-full h-full object-cover"
                alt=""
              />
            </div>
            <h3 className="text-[2vh]">{data.Author.Name}</h3>
          </div>
          <button className=" p-2 rounded-lg" onClick={isSignin ? ()=>{setiscommentpopup(true)} : ()=>{toast.error("Please Signin to like the post")}}>
            <FiMessageCircle />
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Post;
