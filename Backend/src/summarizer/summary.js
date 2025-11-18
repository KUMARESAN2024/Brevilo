import { pipeline } from "@huggingface/transformers";

const summarizer = await pipeline(
  "summarization",
  "Falconsai/text_summarization",
  { dtype: "fp32" }
);

export async function text_summarizer(text) {
  const result = await summarizer(text, {
    min_length: 50,
    max_length: 60,
    do_sample: false,
  });
  return result[0]?.summary_text;
}
