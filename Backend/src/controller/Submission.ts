import type { Request, Response } from "express";
import { submissiontype } from "../types/types";
import { prisma } from "../config/db";

import type { AdminReq } from "../Middlewares/AuthMiddleware";
import { AddQueue } from "../modules/queue/queue";

const lang: Record<string, string> = {
  "91": "java",
  "102": "javascript",
  "110": "C",
  "105": "CPP",
};

export const submission = async (req: Request, res: Response) => {
  const problemId = <string>req.params.problemId; // or as string

  const { success, data, error } = submissiontype.safeParse(req.body);
  if (!success) {
    res.status(400).json({
      success: false,
      error: "Invalid Input",
    });
    console.log(error.message);
    return;
  }

  try {
    const sub = await prisma.submission.create({
      data: {
        language: lang[data.language_id] as string,
        memory: data.memory,
        runtime: data.runtime,
        sourceCode: data.code,
        problemId: problemId,
        userId: (req as AdminReq).id,
      },
    });

    await AddQueue({
      submissionId: sub.id,
      userId: (req as AdminReq).id,
      language_id: data.language_id,
      time: data.runtime,
      memory: data.memory,
      stdin: "",
      source_code: data.code,
      problemId: problemId,
    });

    console.log("code submit");
    res.json({
      submissionId: sub.id,
      message: "Code Submitted",
    });
  } catch (e) {
    res.status(500).json({ error: "Internal server error" + e });
  }
};
