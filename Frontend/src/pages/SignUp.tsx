import React, { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Message from "../components/Message";
// import axios from "axios";
import { api } from "../services/server";
import type { SignUpDetails } from "../utils/Types";
import {
  CheckEmail,
  CheckName,
  CheckPassword,
  CheckUserName,
} from "../utils/VerifyDetails";

function SignUp() {
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_BASE_URL;
  const [details, SetDetails] = useState<SignUpDetails>({
    username: "",
    email: "",
    password: "",
    name: "",
    confrim: "",
    checked: false,
  });

  const [visible, SetVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    error: "s",
    message: "",
    alert: false,
  });

  function handleMessage(error: string, message: string) {
    setMessage({ error: error, message: message, alert: true });
    setTimeout(() => {
      setMessage({ error: "", message: "", alert: false });
    }, 3000);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, type, value, checked } = e.target;
    SetDetails((prev) => ({
      ...prev,
      [name]: type == "checkbox" ? checked : value,
    }));
  }

  function handleSubmit() {
    const name = CheckName(details.name);
    if (name.error) return handleMessage("info", name.message);

    const username = CheckUserName(details.username);
    if (username.error) return handleMessage("info", username.message);

    const email = CheckEmail(details.email);
    if (email.error) return handleMessage("info", email.message);

    const password = CheckPassword(details.password);
    if (password.error) return handleMessage("info", password.message);

    if (details.password !== details.confrim) {
      return handleMessage(
        "info",
        "Please enter the same password in both fields"
      );
    }
    if (!details.checked) {
      return handleMessage("info", "please agree the terms and condition");
    }

    return StroreInDataBase(details);
  }

  async function StroreInDataBase(details: SignUpDetails) {
    try {
      setLoading(true);
      const responce = await api.post(`${URL}/signup`, {
        full_name: details.name,
        user_name: details.username,
        email: details.email,
        password: details.password,
      });

      if (!responce.data.error) {
        handleMessage("sucess", responce.data.message);
      }

      SetDetails({
        email: "",
        name: "",
        password: "",
        username: "",
        checked: false,
        confrim: "",
      });
    } catch (error) {
      const message = error?.response?.data?.message;
      handleMessage("error", message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full min-h-screen  flex  items-center flex-col relative">
      {message.alert && (
        <Message message={message.message} type={message.error} />
      )}
      <FaAngleLeft
        className="w-4 h-4 absolute left-2 top-2 text-white cursor-pointer"
        onClick={() => {
          navigate(-1);
        }}
      />
      <div className="mt-12 gap-5 flex flex-col items-center">
        <p className="text-3xl font-semibold  text-center">
          Let’s set up your profile
        </p>
        <p className="text-[#c1c4c6] text-center w-full">
          sign up to continue your text summarizer
        </p>
        <div className="flex flex-col justify-center items-center  md:w-80 w-60 p-2 h-120 mt-5 text-[#a0a7b0] ">
          <p className="w-full text-left">Name</p>
          <div className="w-full border  shadow-2xl h-12 rounded-[10px] pl-2 mt-0.5">
            <input
              type="text"
              placeholder="Enter your Name here "
              className="outline-none border-none w-full h-full "
              name="name"
              onChange={handleChange}
              value={details?.name}
              disabled={loading}
            />
          </div>
          <p className="w-full text-left">Username</p>
          <div className="w-full border  shadow-2xl h-12 rounded-[10px] pl-2 mt-0.5">
            <input
              type="text"
              placeholder="Create your own username "
              className="outline-none border-none w-full h-full "
              name="username"
              onChange={handleChange}
              value={details?.username}
              disabled={loading}
            />
          </div>
          <p className="w-full text-left">Email</p>
          <div className="w-full border  shadow-2xl h-12 rounded-[10px] pl-2 mt-0.5">
            <input
              type="email"
              placeholder="Enter your Register mail ID "
              className="outline-none border-none w-full h-full "
              name="email"
              onChange={handleChange}
              value={details?.email}
              disabled={loading}
            />
          </div>
          <p className="text-left w-full mt-4">Password</p>
          <div className="flex gap-1 border justify-between px-2 items-center w-full h-12 rounded-[10px] mt-0.5">
            <input
              type="password"
              placeholder="Enter your Password"
              className="outline-none border-none w-full"
              name="password"
              onChange={handleChange}
              value={details?.password}
              disabled={loading}
            />
          </div>
          <p className="text-left w-full mt-4">Confrim Password</p>
          <div className="flex gap-1 border justify-between px-2 items-center w-full h-12 rounded-[10px] mt-0.5">
            <input
              type={visible ? "text" : "password"}
              placeholder="Enter your Password"
              className="outline-none border-none w-full"
              name="confrim"
              onChange={handleChange}
              value={details?.confrim}
              disabled={loading}
            />
            <div
              onClick={() => SetVisible((prev) => !prev)}
              className="m-0 p-0"
            >
              {visible ? <IoEyeOff /> : <IoEye />}
            </div>
          </div>

          <div className="flex gap-1 mt-2">
            <input
              type="checkbox"
              name="checked"
              id=""
              checked={details.checked}
              onChange={handleChange}
              disabled={loading}
            />
            <p>Please Accept the terms and condition</p>
          </div>

          <button
            className="w-30 bg-[#359fff] font-semibold text-white h-13 rounded-[10px] hover:bg-[#2893f7] mt-5 cursor-pointer"
            onClick={handleSubmit}
            onKeyDown={(e) => {
              e.preventDefault();
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          >
            Sign Up
          </button>
        </div>
      </div>

      <p className="bottom-4 absolute">
        Already Have an Account{" "}
        <span
          className="text-[#359fff] underline cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Sign In
        </span>
      </p>
    </div>
  );
}

export default SignUp;
