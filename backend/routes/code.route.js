import express from "express";
import { submitCode, getAllCodes, getCodeFeed } from "../controllers/code.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/submit", protectRoute, submitCode);
router.get("/", protectRoute, getAllCodes);
router.get("/feed", protectRoute, getCodeFeed); 

export default router;
