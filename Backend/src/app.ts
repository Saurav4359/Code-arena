import express from "express";
import { runServer } from "./server";
import cors from "cors";
import cookieParser from "cookie-parser";
import {
  getMySubmission,
  getProblemDescription,
  getProblemDetails,
  hiddenTestcases,
  Problems,
  Signin,
  Signup,
  submission,
  visibleTestcases,
} from "./controller/Controller";
import { logout } from "./auth/logout";
import { AuthMiddleware } from "./Middlewares/AuthMiddleware";
import { AdminCheck } from "./Middlewares/AdminCheck";
import { refreshToken } from "./auth/refresh";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5174", "http://localhost:5173"] , credentials :true}));


const router = express.Router();

app.use("/auth", router);

router.post("/signup", Signup);
router.post("/login", Signin);
router.post("/logout", logout);
router.post("/refresh",refreshToken);

app.use("/submit", router);
router.post("/problem", AuthMiddleware, AdminCheck("ADMIN"), Problems);
router.post(
  "/visibletestcase/:problemId",
  AuthMiddleware,
  AdminCheck("ADMIN"),
  visibleTestcases,
);
router.post(
  "/hiddentestcase/:problemId",
  AuthMiddleware,
  AdminCheck("ADMIN"),
  hiddenTestcases,
);
router.post("/submission/:problemId", AuthMiddleware, submission);

app.use("/get", router);
router.get("/problems", getProblemDetails);
router.get("/getProblemDescription/:problemId", getProblemDescription);
router.get("/getMySubmission",AuthMiddleware, getMySubmission);
runServer(app);
