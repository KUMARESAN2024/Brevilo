import pkg from "jsonwebtoken";
const { verify, sign } = pkg;
import { configDotenv } from "dotenv";
configDotenv();
const Key = process.env.SECRET_KEY;
const RefreshKey = process.env.REFRESH_KEY;

export function VerifyUser(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }
  const token = header.split(" ")[1];
  try {
    verify(token, Key, { complete: true });
    return next();
  } catch (error) {
    return res.status(401).json({ message: "You don't have access use it" });
  }
}

export function GenerateCode(req, res) {
  const user = req.user;

  if (!user) {
    return res.status(400).json({
      error: true,
      message: "User data missing from middleware",
    });
  }

  const { temp_password, __v, ...safeUser } = user._doc ?? user;

  const token = sign(
    {
      role: "user",
      user: safeUser,
    },
    Key,
    { expiresIn: "1d" }
  );

  const refreshToken = sign(
    {
      email: safeUser.email,
    },
    RefreshKey,
    { expiresIn: "7d" }
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.PRODUCTION,
    sameSite: "None",
    path: "/",
  });

  return res.json({
    error: false,
    message: "Login Successfully",
    token,
    user: safeUser,
  });
}
