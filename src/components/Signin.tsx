import facebook from "../assets/Logo/facebook.png";
import google from "../assets/Logo/Google.png";
import SigninImg from "../assets/Banner/SignIn.svg";
import { issignin, Username, Signinpopup, UserId } from "../../store/State";
import { FiX } from "react-icons/fi";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import toast from "react-hot-toast";
import ForgotPassword from "./ForgotPassword";

const Signin = () => {
  const [isSignup, setisSignup] = useState(false);
  const setissignin = useSetRecoilState(Signinpopup);
  const setisloggedin = useSetRecoilState(issignin);
  const setusername = useSetRecoilState(Username);
  const setuserid = useSetRecoilState(UserId);
  const [isforgotpopup, setisforgotpopup] = useState(false);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPass, setConfirmPass] = useState("")
  const [Name, setName] = useState("");

  const handlelogin = async () => {
    if (!Email || !Password) {
      toast.error("Please fill all the fields");
      return;
    }
    if(Password.length < 6){
        toast.error("Password should be atleast 6 characters long");
        return;
    }
    try {
      let uri;
      let response;
      if (isSignup) {
        uri = "https://social-backend-one.vercel.app/auth/signin";
        response = await fetch(uri, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Email: Email,
              Password: Password,
            }),
          });
      } else {
        if (Password !== ConfirmPass) {
            toast.error("Password and Confirm Password should be same");
            return;
        }
        uri = "https://social-backend-one.vercel.app/auth/signup";
        response = await fetch(uri, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Name: Name,
              Email: Email,
              Password: Password,
            }),
          });
      }
      
      const data = await response.json();
      if (data.Check) {
        toast.success("Authntication Success");
        setisloggedin(true);
        setissignin(false);
        setusername(data.user.Name);
        setuserid(data.user._id);
        localStorage.setItem("token", data.authtoken);
      }
      else{
        toast.error(data.errors[0].msg);
      }
      console.log(data);
    } catch (error) {
      toast.error("Invalid Email or Password");
    }
  };



  return (
    <>
    {isforgotpopup && <ForgotPassword  setisforgotpass={setisforgotpopup}/>}
    <div className="z-10 w-screen fixed h-[80vh] justify-center items-center flex">
      <div className="h-full w-full absolute bg-black opacity-40"></div>

      <div className="fixed bg-[#111011] md:w-[52vw] rounded-lg  h-fit shadow-2xl">
        

        <div className="p-[5vh] flex">
          {/* // Signin form */}
          <div
            onClick={() => setissignin(false)}
            className=" flex hover:cursor-pointer text-white p-2 rounded-[50%] md:right-2 md:top-1 right-[10vw] bg-black shadow-3xl absolute font-bold "
          >
            <FiX />
          </div>
          <div>
            <div>
              {isSignup && <h1 className="text-2xl font-bold">Sign In</h1>}
              {!isSignup && (
                <h1 className="text-2xl font-bold">Create Account</h1>
              )}
              <div className="mt-[2vh] h-fit md:w-[25vw] border-gray-400 border-2 rounded-md">
                {!isSignup && (
                  <div className="flex border-b-2">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="w-full p-3 rounded-t-xl "
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                )}
                <input
                  type="text"
                  placeholder="Email"
                  className="w-full p-3 border-b-2 rounded-t-xl"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="Password"
                  className="w-full p-3 border-b-2 rounded-t-xl"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                
                {!isSignup && (
                  <input
                    type="text"
                    placeholder="Confirm Password"
                    className="w-full p-3 rounded-b-xl"
                    onChange={(e) => {
                      setConfirmPass(e.target.value);
                    }}
                  />
                )}
              </div>
            </div>
            {isSignup && (
                    <p className="mt-[2vh] cursor-pointer" onClick={()=> setisforgotpopup(true)}>Forgot Password ?</p>
                )}
            <div className="mt-[3vh]">
              {!isSignup && (
                <button
                  onClick={handlelogin}
                  className="bg-[#2F6CE5] text-sm  text-white p-3  md:w-[25vw] rounded-[5vh]"
                >
                  Create Account
                </button>
              )}
              {isSignup && (
                <button
                  onClick={handlelogin}
                  className="bg-[#2F6CE5] text-sm  text-white p-3  md:w-[25vw] rounded-[5vh]"
                >
                  Sign In{" "}
                </button>
              )}
            </div>
            <div className="mt-[5vh]">
              <button className=" text-sm border-gray-400 flex items-center justify-center w-full gap-2 p-2 border-2 md:w-[25vw] rounded-lg">
                <img src={facebook} alt="logo" className="h-[2vh]" />{" "}
                {isSignup ? `Sign in ` : `Sign up `}
                with Facebook
              </button>
            </div>
            <div className="mt-[1vh]">
              <button className=" text-sm p-2 border-gray-400  border-2 flex items-center w-full justify-center gap-2 md:w-[25vw] rounded-lg">
                <img src={google} alt="logo" className="h-[2vh]" />{" "}
                {isSignup ? `Sign in ` : `Sign up `} with Google
              </button>
            </div>
          </div>
          {/* //Image */}
          <div className="w-full hidden md:flex flex-col items-end">
            {!isSignup && (
              <h1 className="text-sm">
                Already have an account?{" "}
                <button
                  onClick={() => setisSignup(true)}
                  className="text-blue-600"
                >
                  Sign In
                </button>
              </h1>
            )}
            {isSignup && (
              <h1 className="text-sm">
                Don't have an account?{" "}
                <button
                  onClick={() => setisSignup(false)}
                  className="text-blue-600"
                >
                  Create Account
                </button>
              </h1>
            )}
            <img src={SigninImg} alt="" className="mt-[5vh]" />
            <p className="text-[1.5vh] max-w-[20vw] text-gray-500">
              By signing up, you agree to our Terms & conditions, Privacy policy
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Signin;
