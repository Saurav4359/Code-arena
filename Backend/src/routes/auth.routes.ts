import express from "express";
import { Signup } from "../controller/Signup";
import { Signin } from "../controller/Signin";

const AuthRouter = express.Router();


AuthRouter.post("/signup", Signup);
AuthRouter.post("/login", Signin);

export default AuthRouter;