import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/user.routes.js";
import routerAccess from "./routes/acess.routes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = 8080;
const app = express();

const GREEN = "\x1b[32m";
const RESET = "\x1b[0m";

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/user", router);
app.use("/access", routerAccess);

app.listen(PORT, () => {
  console.log(GREEN + `Server running on port ${PORT}` + RESET);
});
