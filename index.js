
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";


import { router as userRouter } from "./routes/user.route.js";
import { router as productRouter } from "./routes/product.route.js";
import { router as commentRouter } from "./routes/comment.route.js";
import { router as loginRouter } from "./routes/login.route.js";

const app = express();
config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/comment", commentRouter);
app.use("/login", loginRouter);
app.use("/public", express.static("public"));


mongoose.connect(process.env.DB_URI);
const db = mongoose.connection;

app.get("/", (req, res) => {
    res.send("Hello, Express!");
});

app.listen(3000, (req, res) => {
    console.log("Server is running on port 3000");
});

