import express from "express";
import { getProblemDetails } from "../controller/GetProblemDetails";
import { getProblemDescription } from "../controller/GetProblemDescription";
import { getMySubmission } from "../controller/GetMySubmission";
import { AuthMiddleware } from "../Middlewares/AuthMiddleware";

const GetRouter = express.Router();
GetRouter.get("/problems", getProblemDetails);
GetRouter.get("/getProblemDescription/:problemId", getProblemDescription);
GetRouter.get("/getMySubmission", AuthMiddleware, getMySubmission);


export default GetRouter;