import { Createpostpopup ,PostsType } from "../../store/State";
import { useSetRecoilState } from "recoil";
import { FiX } from "react-icons/fi";
import { useState } from "react";
import toast from "react-hot-toast";
const CreatePost = () => {
  const setiscreatepost = useSetRecoilState(Createpostpopup);
  const setposttype = useSetRecoilState(PostsType);
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");

  const handlecreatepost = async () => {
    if (!Title || !Content) {
      alert("Please fill all the fields");
      return;
    }
    try {
      const response = await fetch(
        "https://social-backend-one.vercel.app/post/createpost",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            Title: Title,
            Content: Content,
          }),
        }
      );
      const data = await response.json();
      if(data.Check){
        setiscreatepost(false);
        setposttype(Math.random());
        toast.success("Post Created");
      }
      console.log(data);
    } catch (error) {
      toast.error("Error in fetching data");
    }
  };

  return (
    <div className="z-10 w-screen fixed h-[80vh] justify-center items-center flex">
      <div className="h-full w-full absolute bg-black opacity-40"></div>

      <div className="fixed bg-[#111011]  rounded-lg  h-fit shadow-2xl">

        <div className="p-[5vh] flex">
          {/* // Signin form */}
          <div
            onClick={() => setiscreatepost(false)}
            className=" flex hover:cursor-pointer text-white p-2 rounded-[50%] md:right-4 md:top-5 right-[10vw] bg-black shadow-3xl absolute font-bold "
          >
            <FiX />
          </div>
          <div>
            <div>
              <h1 className="text-2xl font-bold">Create Post</h1>
              <div className="mt-[2vh] h-fit md:w-[25vw] border-gray-400 border-2 rounded-md">
                <input
                  type="text"
                  placeholder="Title"
                  className="w-full p-3 border-b-2 rounded-t-xl"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="Content"
                  className="w-full p-3 border-b-2 rounded-t-xl"
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="mt-[3vh]">
              <button
                onClick={handlecreatepost}
                className="bg-[#2F6CE5] text-sm  text-white p-3  md:w-[25vw] rounded-[5vh]"
              >
                Create Post{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
