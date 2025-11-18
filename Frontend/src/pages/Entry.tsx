import Lottie from "lottie-react";
import animationData from "../animation/Hello.json";
import { Link } from "react-router-dom";

function Entry() {
  return (
    <div className="min-h-screen bg-[#0f1923] text-white flex flex-col">
      <div className="flex flex-col items-center flex-grow px-4">
        <Lottie
          animationData={animationData}
          className="md:h-100 md:w-100 text-5xl"
        />

        <h1 className="text-3xl md:text-5xl font-bold mt-1 text-center">
          Welcome to Brevilo
        </h1>

        <p className="text-gray-400 text-center mt-1 max-w-lg">
          Instantly summarize long paragraphs into clean and short content using
          AI.
        </p>

        {/* CTA Buttons */}
        <div className="flex space-x-3 mt-4">
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-md text-base font-medium"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-md text-base font-medium"
          >
            Sign Up
          </Link>
        </div>
      </div>

      <footer className="py-6 bg-[#0c141d] border-t border-gray-800">
        <div className="flex justify-center space-x-6">
          <a
            href="https://linkedin.com"
            className="hover:text-blue-400 transition"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-linkedin text-2xl"></i>
          </a>

          <a
            href="https://facebook.com"
            className="hover:text-blue-500 transition"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-facebook text-2xl"></i>
          </a>

          <a
            href="https://instagram.com"
            className="hover:text-pink-400 transition"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-instagram text-2xl"></i>
          </a>

          <a
            href="https://youtube.com"
            className="hover:text-red-600 transition"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-youtube text-2xl"></i>
          </a>
        </div>

        <p className="text-center text-gray-500 mt-3">
          © {new Date().getFullYear()} Brevilo
        </p>
      </footer>
    </div>
  );
}

export default Entry;
