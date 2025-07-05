import express from "express";
import {
  generateShortUrl,
  redirectUser,
} from "../controllers/url.controller.js";
import Url from "../models/url.model.js";
const router = express.Router();

router.post("/new", generateShortUrl);
router.get("/:shortId", redirectUser);

export default router;
