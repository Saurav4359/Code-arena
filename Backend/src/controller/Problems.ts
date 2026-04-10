import type { Request, Response } from "express";
import { problems } from "../types/types";
import { prisma } from "../config/db";
import type { AdminReq } from "../Middlewares/AuthMiddleware";

export const Problems = async (req: Request, res: Response) => {
  const { success, data, error } = problems.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      success: false,
      error: "Invalid Input",
    });
  }

  try {
    const result = await prisma.problem.create({
      data: {
        title: data.title,
        description: data.description,
        difficulty: data.difficulty,
        tags: data.tags,
        timeLimit: data.timeLimit,
        memoryLimit: data.memoryLimit,
        userId: (req as AdminReq).id,
      },
    });

    res.status(201).json({
      success: true,
      message: "Problem uploaded",
      problemId: result.id,
    });
  } catch (e) {
    res.status(500).json({ error: "Internal Error " });
  }
  // res.cookie;
};
