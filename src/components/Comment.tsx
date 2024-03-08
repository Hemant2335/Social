import React from "react";
import { PostsType } from "../../store/State";
import { useSetRecoilState } from "recoil";
import { FiX } from "react-icons/fi";
import { useState } from "react";
import toast from "react-hot-toast";

type CommentType = {
  PostId: string;
  comments: { Author: { _id: string; Name: string }; Content: string }[];
  setiscommentpopup: React.Dispatch<React.SetStateAction<boolean>>;
};

const Comment = ({ PostId, setiscommentpopup, comments }: CommentType) => {


  const [comment, setcomment] = useState("");
  const setposttype = useSetRecoilState(PostsType);

  const handleaddcomment = async () => {
    try {
      const uri = `https://social-backend-one.vercel.app/intract/comment`;
      const response = await fetch(uri, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          PostId: PostId,
          Content: comment,
        }),
      });
      const res = await response.json();
      if (res.Check) {
        toast.success(res.msg);
        setiscommentpopup(false);
        setposttype(Math.random());
      } else {
        toast.error(res.msg);
      }
    } catch (error) {
      toast.error("Error in adding comment");
    }
  }


  return (
    <div className="z-10 md:w-[70vw] w-[95vw] fixed h-[80vh] justify-center items-center flex">
      <div className="h-full w-full absolute bg-black opacity-40"></div>

      <div className="fixed bg-[#111011] md:w-fit  rounded-lg  h-fit shadow-2xl">
        {/* <div
          onClick={() => setiscommentpopup(false)}
          className="bg-[#111011] md:flex hidden hover:cursor-pointer p-2 rounded-[50%] top-[18vh] right-[20vw] fixed font-bold text-gray-700"
        >
          <FiX />
        </div> */}

        <div className="p-[5vh] flex">
          {/* // Signin form */}
          <div
            onClick={() => setiscommentpopup(false)}
            className=" flex hover:cursor-pointer text-white p-2 rounded-[50%] md:right-4 md:top-5 right-[10vw] bg-black shadow-3xl absolute font-bold "
          >
            <FiX />
          </div>
          <div>
            <div>
              <h1 className="text-2xl font-bold">Comment</h1>
              <div className="mt-[2vh] h-fit gap-2 md:w-[25vw] flex border-gray-400  rounded-md">
                <input
                  type="text"
                  placeholder="Title"
                  className="w-full p-3 border-2 rounded-xl"
                  onChange={(e) => {
                    setcomment(e.target.value);
                  }}
                />
                <button
                  onClick={handleaddcomment}
                  className="bg-[#2F6CE5] text-sm  text-white p-3  rounded"
                >
                  Add{" "}
                </button>
              </div>
            </div>

            <div className="mt-[3vh]">
              Previous Comments
              <div>
                {comments?.map((comment) => {
                  return (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-[6vh] h-[6vh] rounded-[50%] ">
                        <img
                          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                          className="rounded-[50%] w-full h-full object-cover"
                          alt=""
                        />
                      </div>
                      <h3 className="text-[2.2vh] font-medium">{comment.Author.Name}</h3>
                      <p className="text-[2vh] font-thin">{comment.Content}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
