import Lottie from "lottie-react";
import ErrorAnimation from "../animation/site under construction.json";
import { useNavigate } from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center  text-white  text-center px-6">
      <div className="max-w-md w-full flex flex-col items-center">
        <Lottie
          animationData={ErrorAnimation}
          className="w-full h-96 mb-6"
          loop
          autoplay
        />

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Oops! This Page is Under Construction 🚧
        </h1>

        <p className="text-gray-600 mb-6">
          We’re currently working hard to bring you something amazing. In the
          meantime, you can head back to the homepage or check out other
          sections of the site.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-pink-400 hover:bg-pink-500 transition-colors rounded-lg text-white font-semibold cursor-pointer"
          >
            Go Home
          </button>

          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 transition-colors rounded-lg text-gray-800 font-semibold cursor-pointer"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
}
