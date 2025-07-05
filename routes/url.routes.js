import express from "express";
import {
  genertaShortUrl,
  redirectUser,
} from "../controllers/url.controller.js";
import Url from "../models/url.model.js";
const router = express.Router();

router.post("/new", genertaShortUrl);
router.get("/:shortId", redirectUser);

export default router;
