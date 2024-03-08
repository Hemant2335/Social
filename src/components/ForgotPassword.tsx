import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiX } from "react-icons/fi";

type ForgotPasswordProps = {
  setisforgotpass: React.Dispatch<React.SetStateAction<boolean>>;
};

const ForgotPassword = ({ setisforgotpass }: ForgotPasswordProps) => {

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("")
    const handleforgotPass = async () => {
        if (!Email) {
          alert("Please fill the Email");
          return;
        }
        try {
          const uri = "https://social-backend-one.vercel.app/auth/changepassword";
          const response = await fetch(uri, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Email: Email,
              Password: Password,
            }),
          });
          const data = await response.json();
          if (data.Check) {
            toast.success("Password Changed");
            setisforgotpass(false);
          } else {
            toast.error("Invalid Email or Password");
          }
        } catch (error) {
          toast.error("Internal Server Error");
        }
    }

  return (
    <div className="z-30 w-screen fixed h-[80vh] justify-center items-center flex">
      <div className="h-full w-full absolute bg-black opacity-40"></div>

      <div className="fixed bg-[#111011]  rounded-lg  h-fit shadow-2xl">
        <div className="p-[5vh] flex">
          {/* // Signin form */}
          <div
            onClick={() => setisforgotpass(false)}
            className=" flex hover:cursor-pointer text-white p-2 rounded-[50%] md:right-4 md:top-5 right-[10vw] bg-black shadow-3xl absolute font-bold "
          >
            <FiX />
          </div>
          <div>
            <div>
              <h1 className="text-2xl font-bold">Forgot Password</h1>
              <div className="mt-[2vh] h-fit md:w-[25vw] border-gray-400 border-2 rounded-md">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 border-b-2 rounded-t-xl"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full p-3 border-b-2 rounded-t-xl"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="mt-[3vh]">
                <button
                  onClick={handleforgotPass}
                  className="bg-[#2F6CE5] text-sm  text-white p-3  md:w-[25vw] rounded-[5vh]"
                >
                  Change Password{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
