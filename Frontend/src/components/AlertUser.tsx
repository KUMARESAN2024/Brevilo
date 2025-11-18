import { useNavigate } from "react-router-dom";
function AlertUser() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center flex-col items-center w-max h-70 gap-2  p-1  rounded-xl">
      <button
        className="w-50 md:w-65 p-2 h-max bg-[#359ffe] rounded-xl cursor-pointer  font-semibold text-[17px] hover:scale-101 transition-all ease-in-out"
        onClick={() => navigate("/signup")}
      >
        SignUp
      </button>
      <span className="text-[13px]">OR</span>
      <button
        className="w-50 md:w-65 p-2 h-max bg-[#1a4165]  rounded-xl cursor-pointer font-semibold text-[17px] hover:scale-101 transition-all ease-in-out"
        onClick={() => navigate("/login")}
      >
        Login
      </button>
    </div>
  );
}

export default AlertUser;
