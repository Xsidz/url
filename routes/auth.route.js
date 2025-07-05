import express from "express";
const router = express.Router()
import { signup,login,logout,checkAuth } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

router.post("/signup" , signup)
router.post("/login" , login)
router.post("/logout" , logout)
router.get("/check", protectRoute,checkAuth)


export default router;