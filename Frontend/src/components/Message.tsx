import { CiFaceSmile } from "react-icons/ci";
import { CiFaceFrown } from "react-icons/ci";
import { CiFaceMeh } from "react-icons/ci";

function Message(props: { message: string; type: string }) {
  return (
    <div
      className={` w-max h-15  text-center rounded-[10px] flex justify-center items-center p-2 ${
        props.type == "error"
          ? "bg-red-400"
          : props.type == "info"
          ? "bg-amber-300"
          : "bg-green-400"
      } absolute top-10   `}
    >
      <div className="absolute -top-2 p-0   -right-2 bg-white  rounded-full  text-black text-2xl ">
        {props.type == "error" ? (
          <CiFaceFrown />
        ) : props.type == "info" ? (
          <CiFaceMeh />
        ) : (
          <CiFaceSmile />
        )}
      </div>
      {props.message}
    </div>
  );
}

export default Message;
