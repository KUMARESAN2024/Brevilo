import { text_summarizer } from "../summarizer/summary.js";
import { SaveSummary } from "../utils/mongoose.js";
import express from "express";
const router = express.Router();

export async function handleSummary(req, res) {
  const { summary_text } = req.body;
  const refreshToken = req?.cookies?.refreshToken;
  const text = await text_summarizer(summary_text);
  const data = await SaveSummary(text, summary_text);
  return res.json({ text });
}

export default router;
