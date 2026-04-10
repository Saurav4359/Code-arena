import type { Request, Response } from "express";

export const getServerRunning = (req: Request, res: Response) => {
  return res.json({
    success: true,
    message: "Server is running",
  });
};
