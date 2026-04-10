import type { Request, Response } from "express";
import { testcases } from "../types/types";
import { prisma } from "../config/db";

import type { AdminReq } from "../Middlewares/AuthMiddleware";
import { UploadTest } from "../modules/Supabase/uploadFile";

export const visibleTestcases = async (req: Request, res: Response) => {
  const problemId = <string>req.params.problemId; // or as string
  const { success, data, error } = testcases.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      success: false,
      error: "Invalid Input",
    });
  }
  try {
    const prob = await prisma.problem.findFirst({
      where: { id: problemId, userId: (req as AdminReq).id },
    });
    if (!prob) {
      return res.status(404).json({ message: "You dont have problem created" });
    }
    const test = await prisma.visible_testcases.findMany({
      where: { problemId: problemId },
    });
    const len = test.length;
    const inputfilepath = `VisibleTestCase/INPUT/${problemId}file${len + 1}`;
    const outputfilepath = `VisibleTestCase/OUTPUT/${problemId}file${len + 1}`;
    await UploadTest(inputfilepath, data.input);
    await UploadTest(outputfilepath, data.output);
    await prisma.visible_testcases.create({
      data: {
        inputPath: inputfilepath,
        outputPath: outputfilepath,
        problemId,
      },
    });
    res.send("done");
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
};
