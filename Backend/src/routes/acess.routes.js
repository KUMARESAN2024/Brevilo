import express, { Router } from "express";
import { handleSummary } from "./summary.routes.js";
import { VerifyUser } from "../middleware/auth.js";
const routerAccess = express.Router();

routerAccess.post("/summary", VerifyUser, handleSummary);
export default routerAccess;
