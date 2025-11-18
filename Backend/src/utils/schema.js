import mongoose, { Schema } from "mongoose";

const userScheme = new Schema(
  {
    full_name: { type: String, required: true },
    user_name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    temp_password: { type: String, required: true },
    created_at: { type: Date, default: Date.now() },
    last_login: { type: Date, default: null },
  },
  { collection: "userDetails" }
);

export const User = mongoose.model("User", userScheme);

const summaryShema = new Schema(
  {
    summarized_passage: { type: String, required: true },
    original_passage: { type: String, required: true },
    user_id: { type: mongoose.Schema.ObjectId, ref: User },
  },
  { collection: "Summaries", timestamps: true }
);

export const Summaries = mongoose.model("Summaries", summaryShema);
