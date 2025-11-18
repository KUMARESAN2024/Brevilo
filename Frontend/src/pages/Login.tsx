import { useState } from "react";
import type { LoginDetails } from "../utils/Types";
import { useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import Message from "../components/Message";
import { CheckEmail, CheckPassword } from "../utils/VerifyDetails";
import { api } from "../services/server";

function Login() {
  const [details, SetDetails] = useState<LoginDetails>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [visible, SetVisible] = useState<boolean>(false);
  const [message, setMessage] = useState({
    error: "s",
    message: "",
    alert: false,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    SetDetails((prev) => ({ ...prev, [name]: value }));
  }
  function handleSubmit() {
    const email = CheckEmail(details.email);
    if (email.error) return handleMessage("info", email.message);

    const password = CheckPassword(details.password);
    if (password.error) return handleMessage("info", password.message);
    return checkUser(details);
  }
  function handleMessage(error: string, message: string) {
    setMessage({ error: error, message: message, alert: true });
    setTimeout(() => {
      setMessage({ error: "", message: "", alert: false });
    }, 3000);
  }
  async function checkUser(details: LoginDetails) {
    try {
      const responce = await api.post("user/login", {
        email: details.email,
        password: details.password,
      });
      if (!responce.data.error) {
        localStorage.setItem("user", JSON.stringify(responce.data.user));
        localStorage.setItem("accessToken", responce.data.token);
        handleMessage("sucess", responce.data.message);
        setTimeout(() => (window.location.href = "/"), 700);
      }
    } catch (error) {
      const message = error?.response?.data?.message;
      handleMessage("error", message);
    }
  }

  return (
    <div className="w-full min-h-screen flex  items-center p-1 bg relative flex-col  ">
      {message.alert && (
        <Message message={message.message} type={message.error} />
      )}
      <FaAngleLeft
        className="w-4 h-4 absolute left-2 top-2 text-white cursor-pointer"
        onClick={() => {
          navigate(-1);
        }}
      />

      <div className="mt-30 gap-5 flex flex-col">
        <p className="text-3xl font-semibold  text-center">Welcome Back</p>
        <p className="text-[#c1c4c6]">Login to continue your text summarizer</p>
      </div>

      <div className="flex flex-col justify-center items-center  md:w-80 w-60 p-2 h-60 mt-10 text-[#a0a7b0] ">
        <p className="w-full text-left">Email</p>
        <div className="w-full border  shadow-2xl h-12 rounded-[10px] pl-2 mt-0.5 p-2">
          <input
            type="email"
            placeholder="Enter your Register mail ID "
            className="outline-none border-none w-full h-full "
            name="email"
            onChange={handleChange}
            value={details?.email}
          />
        </div>
        <p className="text-left w-full mt-4">Password</p>
        <div className="flex gap-1 border justify-between px-2 items-center w-full h-12 rounded-[10px] mt-0.5 p-2">
          <input
            type={visible ? "text" : "password"}
            placeholder="Enter your Password"
            className="outline-none border-none w-full"
            name="password"
            onChange={handleChange}
            value={details?.password}
          />
          <div onClick={() => SetVisible((prev) => !prev)} className="m-0 p-0">
            {visible ? <IoEyeOff /> : <IoEye />}
          </div>
        </div>
        <p className="text-right w-full text-red-400 text-xs underline cursor-pointer">
          forgot?
        </p>
        <button
          className="w-30 bg-[#359fff] font-semibold text-white h-13 rounded-[10px] hover:bg-[#2893f7] mt-5 cursor-pointer"
          onClick={handleSubmit}
        >
          Log in
        </button>
      </div>
      <p className="bottom-20 absolute">
        Don't Have an Acoount{" "}
        <span
          className="text-[#359fff] underline cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </span>
      </p>
    </div>
  );
}

export default Login;
