import Avatar from "../assets/avatar.png";
import Wrapper from "./Wrapper";
import {
  PostsType,
  issignin,
  Username,
  Createpostpopup,
  Signinpopup,
} from "../../store/State";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { useState } from "react";

const Navbar = () => {
  const setPostType = useSetRecoilState(PostsType);
  const isSignin = useRecoilValue(issignin);
  const setSigninPopup = useSetRecoilState(Signinpopup);
  const setCreatepostPopup = useSetRecoilState(Createpostpopup);
  const username = useRecoilValue(Username);
  const [isdrop, setisdrop] = useState(false);
  return (
    <Wrapper>
      <div className="bg-[#111011] rounded-[3vw] mt-[5vh] p-[1.5vh] flex items-center ">
        <nav className="flex w-full justify-between items-center">
          <div
            className="flex items-center gap-2 relative"
            onMouseLeave={() => setisdrop(!isdrop)}
            onMouseEnter={() => setisdrop(!isdrop)}
          >
            <div className="w-[6vh] h-[6vh] rounded-[50%] ">
              <img
                src={Avatar}
                className="rounded-[50%] w-full h-full object-cover"
                alt=""
              />
            </div>
            <h3 className="text-[2.2vh] font-semibold cursor-pointer">
              {isSignin ? `${username}` : `Secrets`}
            </h3>
            {isSignin && isdrop && (
              <div className="w-fit bg-[#111011] top-[6vh]  absolute right-[-1vh] h-fit  rounded-md">
                <ul className="text-sm gap">
                  <li
                    onClick={() => {
                      localStorage.removeItem("token");
                      window.location.reload();
                    }}
                    className="p-2 px-4 cursor-pointer hover:bg-gray-600 rounded-b-lg"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
          <ul className="flex gap-2 items-center">
            <li
              onClick={() => setPostType(0)}
              className="text-[2vh] font-medium cursor-pointer hover:text-white text-gray-400"
            >
              All Posts
            </li>
            <li>|</li>
            <li
              onClick={() => {
                if (isSignin) {
                  setPostType(1);
                } else {
                  setSigninPopup(true);
                }
              }}
              className="text-[2vh] font-medium hover:text-white cursor-pointer text-gray-400"
            >
              Your Posts
            </li>
          </ul>
          {!isSignin ? (
            <button
              onClick={() => setSigninPopup(true)}
              className="bg-white text-gray-800 p-2 w-[9vw] rounded-[5vw]"
            >
              Sign in
            </button>
          ) : (
            <button
              onClick={() => setCreatepostPopup(true)}
              className="bg-white text-gray-800 p-2 w-[9vw] rounded-[5vw]"
            >
              <span className="text-[2vh]">New Post</span>
            </button>
          )}
        </nav>
      </div>
    </Wrapper>
  );
};

export default Navbar;
