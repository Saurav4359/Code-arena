import type { Request, Response } from "express";
import {
  signup,
} from "../types/types";
import { prisma } from "../config/db";
import {
  HashPassword,
} from "../utils/services";

export const Signup = async (req: Request, res: Response) => {
  const { success, data } = signup.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      success: false,
      error: "Invalid Input",
    });
  }
  try {
    const checkEmail = await prisma.user.findFirst({
      where: { email: data.email },
    });
    if (checkEmail) {
      return res.status(409).json({
        success: false,
        error: "Email Already Exists !",
      });
    }
    const password = await HashPassword(data.password);
    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: password,
        role: data.role,
      },
    });

    res.status(201).json({
      success: true,
      message: "User Successfully created",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
