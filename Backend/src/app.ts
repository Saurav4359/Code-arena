import express from "express";
import { runServer } from "./server";
import cors from "cors";
import cookieParser from "cookie-parser";
import SubmitRouter from "./routes/problem.routes";
import AuthRouter from "./routes/auth.routes";
import { getServerRunning } from "./controller/GetServerRunning";
import GetRouter from "./routes/submission.routes";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5174", "http://localhost:5173"],
    credentials: true,
  }),
);

app.get("/", getServerRunning);
app.use("/auth", AuthRouter);
app.use("/submit", SubmitRouter);
app.use("/get", GetRouter);
runServer(app);
