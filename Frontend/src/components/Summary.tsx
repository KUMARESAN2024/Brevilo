import { useState } from "react";
import { api } from "../services/server";
import { IoIosCloseCircleOutline } from "react-icons/io";

function Summary() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [length, setLength] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);

    try {
      const response = await api.post(
        "access/summary",
        { summary_text: text },
        { withCredentials: true }
      );

      setSummary(response.data.text);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-white relative shadow-2xl p-6">
      <div className="w-full max-w-2xl ">
        <textarea
          name="summaryField"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          placeholder="Enter your text here..."
          className="w-full h-40 p-4 rounded-2xl bg-[#0f1923] border border-[#2c3e50] text-[#a0a7b0] placeholder-[#667788] resize-none focus:outline-none focus:ring-4 focus:ring-[#3b82f6] transition-all duration-300 shadow-inner text-lg"
        />

        <div className="flex items-center justify-between flex-wrap gap-4 mt-2">
          <label className="flex items-center gap-2 text-[#a0a7b0]">
            <span className="text-sm font-medium">Summary Length:</span>
            <input
              type="text"
              value={length}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*$/.test(val)) {
                  setLength(val);
                }
              }}
              className="w-15 rounded-md bg-[#0f1923] border border-[#2c3e50] text-center text-[#a0a7b0] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] transition-all"
            />
          </label>

          <button
            onClick={handleGenerate}
            disabled={!text || loading}
            className={`px-6 py-2 rounded-2xl font-medium transition-all duration-300 flex items-center justify-center gap-2 text-white ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] hover:from-[#1d4ed8] hover:to-[#2563eb]"
            }`}
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
            )}
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>

        {summary && (
          <div className="absolute -top-30 inset-0 w-full max-h-100 min-h-40 overflow-auto rounded-2xl bg-[#141e28]/95 border border-[#243447] flex flex-col items-center justify-center text-[#a0a7b0] leading-relaxed shadow-inner animate-fadeIn p-6 gap-4 ">
            <IoIosCloseCircleOutline
              className=" absolute top-1 right-1 cursor-pointer text-2xl"
              onClick={() => setSummary("")}
            />
            <strong className="text-[#3b82f6] text-lg">Summary:</strong>
            <p className="text-center text-md">{summary}</p>

            {/* Rephraser / Regenerator Button */}
            <button
              // onClick={}
              className="mt-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-500 rounded-full text-white font-medium transition-all duration-300"
            >
              Rephraser
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Summary;
