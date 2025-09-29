import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.routes.js";

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/", authRoutes);

export default app;
