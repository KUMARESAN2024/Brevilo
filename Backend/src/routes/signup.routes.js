import { connectDb, saveNewUser } from "../utils/mongoose.js";
import express from "express";
const router = express.Router();

export async function singUp(req, res) {
  const connect = await connectDb();
  // console.log("Signup");
  if (connect) {
    const { full_name, user_name, email, password } = req.body;
    if (full_name && user_name && email && password) {
      const responce = await saveNewUser(req.body);
      const { error, msg } = responce;
      if (error) {
        return res.status(400).json({ error: error, message: msg });
      }

      return res.status(201).json({ error: error, message: msg });
    } else {
      res.status(400).json({ error: true, message: "Some field is missing" });
    }
  } else {
    return res.status(500).json({
      error: true,
      message: "Their was error to  connect our Database",
    });
  }
}

export default router;
