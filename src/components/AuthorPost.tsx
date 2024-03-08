import { FiMoreHorizontal } from "react-icons/fi";
import Img from "../assets/Banner/PostImg.jpg";
import Avatar from "../assets/avatar.png";
import { PostsType } from "../../store/State";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import toast from "react-hot-toast";

type ArticleCardProps = {
  data: {
    _id: string;
    Title: string;
    Content: string;
    Author: { _id: string; Name: string };
    Comments: [];
    Likes: [];
  };
};

const AuthorPost = ({ data }: ArticleCardProps) => {
  const [isdrop, setisdrop] = useState(false);
  const setposttype = useSetRecoilState(PostsType);
  const [Title, setTitle] = useState(data.Title);
  const [Content, setContent] = useState(data.Content);

  const deletepost = async () => {
    try {
      console.log(data._id);
      const uri = `https://social-backend-one.vercel.app/post/deletepost/${data._id}`;
      const response = await fetch(uri, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      const res = await response.json();
      if (res.Check) {
        toast.success("Post Deleted");
        setposttype(Math.random());
      } else {
        toast.error("Error in deleting post");
      }
    } catch (error) {
      toast.error("Internal Server Error");
    }
  };

  const UpdatePost = async () => {
    try {
      const uri = `https://social-backend-one.vercel.app/post/updatepost/${data._id}`;
      const response = await fetch(uri, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          Title: Title,
          Content: Content,
        }),
      });
      const res = await response.json();
      if (res.Check) {
        toast.success("Post Updated");
        setposttype(Math.random());
      } else {
        toast.error("Error in updating post");
      }
    } catch (error) {
      toast.error("Error in updating post");
    }
  }

  useEffect(()=>{
    setTimeout(() => {
        toast.success("Please Click on tiltle or content to update the post" , {
            duration: 5000
        
        })
    }, 1000);
  } ,[])

  return (
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
        <div className="flex w-full justify-between items-center ">
          <input
            className="text-lg font-bold bg-black"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={Title}
          />
          <button
            onMouseLeave={() => setisdrop(!isdrop)}
            onMouseEnter={() => setisdrop(!isdrop)}
            className="text-xl bg-black relative"
          >
            <FiMoreHorizontal />
            {isdrop && (
              <div className="w-fit bg-[#111011]   absolute right-0 h-fit  rounded-md">
                <ul className="text-sm gap">
                  <li
                    onClick={deletepost}
                    className="p-2 px-4 hover:bg-gray-600 rounded-b-lg"
                  >
                    Delete
                  </li>
                </ul>
              </div>
            )}
          </button>
        </div>
        <input
          className="text-sm font-medium bg-black"
          onChange={(e) => {
            setContent(e.target.value);
          }}
          value={Content}
        />
        <div className="flex mt-[2vh] justify-between items-center">
          <div className=" flex items-center gap-2">
            <div className="w-[6vh] h-[6vh] rounded-[50%] ">
              <img
                src={Avatar}
                className="rounded-[50%] w-full h-full object-cover"
                alt=""
              />
            </div>
            <h3 className="text-[2vh]">{data.Author.Name}</h3>
          </div>
          <button onClick={UpdatePost} className=" p-2 text-sm rounded-lg">Update</button>
        </div>
      </div>
    </div>
  );
};

export default AuthorPost;
