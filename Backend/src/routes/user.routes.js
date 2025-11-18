import express from "express";

import { GenerateCode, VerifyUser } from "../middleware/auth.js";
import { singUp } from "./signup.routes.js";
import { LoginUser } from "./login.routes.js";
import { CheckHeader } from "./refresh.routes.js";
import { UpdateUser } from "./update.routes.js";
const router = express.Router();

router.post("/login", LoginUser, GenerateCode);
router.post("/signup", singUp);
router.post("/refresh/token", CheckHeader);
router.patch("/account/update", VerifyUser, UpdateUser);
export default router;
