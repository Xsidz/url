import express from "express";
import dotenv from "dotenv";
import authroute from "./routes/auth.route.js";
import urlroute from "./routes/url.routes.js"
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors"
dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(
  cors({
    origin: "http://localhost:5500",
    methods: "GET, POST, PUT, DELETE, OPTIONS", // Include PUT
    allowedHeaders: "Content-Type, Authorization",
    credentials: true, // Allow cookies to be sent
  })
);

app.use("/", urlroute)
app.use("/auth", authroute);
app.listen(PORT, (req, res) => {
  console.log("Server is running!");
  connectDB();
  
});
