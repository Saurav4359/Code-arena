import express from "express";
import { AuthMiddleware } from "../Middlewares/AuthMiddleware";
import { AdminCheck } from "../Middlewares/AdminCheck";
import { Problems } from "../controller/Problems";
import { visibleTestcases } from "../controller/VisibleTestcases";
import { hiddenTestcases } from "../controller/HiddenTestcases";
import { submission } from "../controller/Submission";

const SubmitRouter = express.Router();

SubmitRouter.post("/problem", AuthMiddleware, AdminCheck("ADMIN"), Problems);
SubmitRouter.post(
  "/visibletestcase/:problemId",
  AuthMiddleware,
  AdminCheck("ADMIN"),
  visibleTestcases,
);
SubmitRouter.post(
  "/hiddentestcase/:problemId",
  AuthMiddleware,
  AdminCheck("ADMIN"),
  hiddenTestcases,
);
SubmitRouter.post("/submission/:problemId", AuthMiddleware, submission);

export default SubmitRouter;