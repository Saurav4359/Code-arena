import type { Request, Response } from "express";
import { signin } from "../types/types";
import { prisma } from "../config/db";
import { ComparePassword, GenerateToken } from "../utils/services";

export const Signin = async (req: Request, res: Response) => {
  const { success, data, error } = signin.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      success: false,
      error: "Invalid Input",
    });
  }
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Incorrect email",
      });
    }
    const checkpassword = await ComparePassword(data.password, user.password);
    if (!checkpassword) {
      return res.status(401).json({
        success: false,
        error: "Incorrect Password",
      });
    }
    const accessToken = await GenerateToken({
      userId: user.id,
      role: user.role,
    });

    res.status(201).json({
      success: true,
      accessToken: accessToken,
      name: user.name,
      role: user.role,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
