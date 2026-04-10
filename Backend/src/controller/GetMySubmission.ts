import type { Request, Response } from "express";

import { prisma } from "../config/db";

import type { AdminReq } from "../Middlewares/AuthMiddleware";

export const getMySubmission = async (req: Request, res: Response) => {
  const userId = (req as AdminReq).id;

  try {
    const data = await prisma.submission.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
        problem: {
          select: {
            title: true,
          },
        },
      },
      omit: {
        sourceCode: true,
        userId: true,
        problemId: true,
        id: true,
      },
    });

    res.send(data);
  } catch (e) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
