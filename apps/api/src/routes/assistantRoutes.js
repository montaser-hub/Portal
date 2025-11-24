import express from "express";
import { aiAssistant } from "../controllers/assistantController.js";
import * as authController from "../controllers/authController.js";

const router = express.Router();

router.post("/", authController.isAuth, aiAssistant);

export default router;
