import type { Request, Response } from "express";
import { prisma } from "../config/db";
import { DownloadFile } from "../modules/Supabase/downloadFile";

export const getProblemDescription = async (req: Request, res: Response) => {
  const problemId = req.params.problemId;
  try {
    const data = await prisma.problem.findFirst({
      where: {
        id: problemId as string,
      },
      include: {
        visible_testcases: true,
      },
    });
    if (!data) {
      return res.status(400).json({
        success: false,
        error: "Problem Not found",
      });
    }
    const testcased = await Promise.all(
      data?.visible_testcases.map(async (test) => ({
        input: await DownloadFile(test.inputPath),
        output: await DownloadFile(test.outputPath),
      })),
    ); // this map function has async callback , so it gives us array of promise thats why we are awaiting and using promise.all to finish all of them  and give final result

    res.status(200).send({
      title: data?.title,
      description: data?.description,
      difficulty: data?.difficulty,
      tags: data?.tags,
      timeLimit: data?.timeLimit,
      memoryLimit: data?.memoryLimit,
      test: testcased,
    });
  } catch (e) {
    res.status(500).json({
      error: "Internal Server Error ",
    });
  }
};
