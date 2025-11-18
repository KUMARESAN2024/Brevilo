import { configDotenv } from "dotenv";
import pkg from "jsonwebtoken";
const { verify, sign } = pkg;

configDotenv();

export function CheckHeader(req, res) {
  console.log("Requesting the refresh");

  const refreshToken = req?.cookies?.refreshToken;

  if (!refreshToken) {
    return res
      .status(401)
      .json({ error: true, message: "No refresh token found" });
  }

  try {
    const decoded = verify(refreshToken, process.env.REFRESH_KEY);

    const userData = decoded.user;

    if (!userData) {
      return res.status(401).json({
        error: true,
        message: "Invalid token structure",
      });
    }

    const newAccessToken = sign(
      {
        role: decoded.role || "user",
        user: userData,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    const newRefreshToken = sign(
      {
        role: decoded.role || "user",
        user: userData,
      },
      process.env.REFRESH_KEY,
      { expiresIn: "7d" }
    );

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "None",
      path: "/",
    });

    return res.json({
      error: false,
      message: "New tokens generated successfully",
      token: newAccessToken,
    });
  } catch (error) {
    return res.status(401).json({
      error: true,
      message: "Refresh token is expired or invalid",
    });
  }
}
