import type { Request, Response } from "express";
import { prisma } from "../config/db";

export const getProblemDetails = async (req: Request, res: Response) => {
  try {
    const data = await prisma.problem.findMany({
      select: {
        title: true,
        tags: true,
        difficulty: true,
        id: true,
      },
    });
    if (!data) {
      res.status(404).json({
        status: false,
        error: "Problems Not found",
      });
    }
    res.status(200).send(data);
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
