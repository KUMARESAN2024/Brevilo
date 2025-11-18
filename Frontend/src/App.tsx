import animationMain from "./animation/Ai.json";
import Lottie from "lottie-react";
import NavBar from "./components/NavBar";
// import { useNavigate } from "react-router-dom";
import AlertUser from "./components/AlertUser";
import Summary from "./components/Summary";
// import { encryptToken, decrytoToken } from "./utils/cryto";
// import { useState } from "react";

function App() {
  // const navigate = useNavigate();
  // const [user, setUser] = useState("");

  return (
    <div className="w-full  bg-[#0f1923] text-white flex flex-col items-center p-2  gap-10 min-h-screen ">
      <p className="text-3xl font-bold">Brevilo</p> {/*App title */}
      <div className="flex justify-center items-center flex-col">
        {/* 
        // Center Component that if user not show the login or signup else grret
        to the user */}
        <Lottie animationData={animationMain} className="w-25 h-30" />{" "}
        <div className="flex justify-center items-center flex-col">
          <p className="w-full md:w-140 text-center">
            Brevilo is an AI-powered note summarizer that helps you turn long
            notes or documents into clear, concise summaries within seconds.
          </p>
          {/* <AlertUser /> */}
          <div className="h-max">
            <Summary />
          </div>
        </div>
      </div>
      <NavBar />
    </div>
  );
}

export default App;
