import { MdOutlineDashboard } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import { MdOutlineAddBox } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
function NavBar() {
  const name: string = useLocation().pathname;
  const navigate = useNavigate();
  return (
    <div className="mb-5 flex w-full absolute bottom-1  md:w-70  justify-between items-center text-xl h-max md:text-2xl bg-black/20 py-2 px-6 rounded-2xl">
      <div
        className={`flex justify-center  flex-col items-center gap-0.5 cursor-pointer ${
          name == "/dashboard" ? "text-[#359ffe] " : ""
        }`}
        onClick={() => navigate("/dashboard")}
      >
        <MdOutlineDashboard />
        <p className="text-[10px]">DashBoard</p>
      </div>
      <div
        className={`flex justify-center  flex-col items-center gap-0.5 cursor-pointer ${
          name == "/" ? "text-[#359ffe] " : ""
        }`}
        onClick={() => navigate("/")}
      >
        <MdOutlineAddBox />
        <p className="text-[10px]">Main</p>
      </div>
      <div
        className={`flex justify-center  flex-col items-center gap-0.5 cursor-pointer ${
          name == "/account" ? "text-[#359ffe] " : ""
        }`}
        onClick={() => navigate("/account")}
      >
        <BiUser className="group-hover:scale-101" />
        <p className="text-[10px]">Account</p>
      </div>
    </div>
  );
}

export default NavBar;
