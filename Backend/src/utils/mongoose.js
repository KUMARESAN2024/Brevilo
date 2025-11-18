import mongoose from "mongoose";
import { config } from "dotenv";
import { User, Summaries } from "./schema.js";
import { encryptPassWord, decryptPassWord } from "./crypto.js";

config();

const URL = process.env.MONGO_KEY;

let isConnected = false;

export async function connectDb() {
  if (isConnected) return true;

  try {
    await mongoose.connect(URL);

    isConnected = true;
    return true;
  } catch (error) {
    return false;
  }
}

export async function saveNewUser(e) {
  await connectDb();

  const { full_name, user_name, password, email } = e;
  const temp_password = await encryptPassWord(password);

  const user = new User({
    full_name,
    user_name,
    temp_password: temp_password,
    email,
  });

  try {
    const data = await user.save();
    return { msg: "User saved successfully", data, error: false };
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return {
        msg: ` ${field.toUpperCase()} Already  Exits: ${error.keyValue[field]}`,
        error: true,
      };
    } else if (error.name === "ValidationError") {
      return { msg: `Validation failed: ${error.message}`, error: true };
    } else if (error.name === "CastError") {
      return { msg: `Invalid data type: ${error.message}`, error: true };
    } else {
      return { msg: `Other MongoDB error: ${error.message}`, error: true };
    }
  }
}

export async function retriveUser(email) {
  await connectDb();
  try {
    if (!email) {
      return { msg: "Email is required", error: true };
    }

    const data = await User.findOne({ email });
    if (!data) {
      return { msg: "User not found", error: true };
    }
    return { msg: "User retrieved successfully", data, error: false };
  } catch (error) {
    console.error(" Retrieval error:", error.message);
    return { msg: `Error retrieving user: ${error.message}`, error: true };
  }
}

export async function SaveSummary(text, summary_text) {
  await connectDb();
  if (!text && !summary_text) {
    return { error: true, msg: "Text or Summary_text is emptyed" };
  }
  const s = new Summaries({
    summarized_passage: text,
    original_passage: summary_text,
  });
  try {
    const data = await s.save();
  } catch (error) {
    
  }
}
