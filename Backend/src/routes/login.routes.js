import { retriveUser } from "../utils/mongoose.js";
import { decryptPassWord } from "../utils/crypto.js";

export async function LoginUser(req, res, next) {
  const body = req.body;

  if (!body?.email || !body?.password) {
    return res.status(400).json({
      error: true,
      message: "Email or password is missing",
    });
  }

  const { email, password } = body;

  const data = await retriveUser(email);

  if (data?.error) {
    return res.status(400).json({ error: true, message: data?.msg });
  }

  const { temp_password } = data?.data;

  const isMatched = await decryptPassWord(password, temp_password);

  if (!isMatched) {
    return res
      .status(400)
      .json({ error: true, message: "Password doesn't match" });
  }

  req.user = data.data;

  next();
}
