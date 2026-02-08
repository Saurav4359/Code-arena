import { Worker } from "bullmq";
import { AddQueue } from "../queue/queue";
import { getResult, submitCode } from "../judge/execution";
import { GetHiddenTest, GetVisibleTest } from "../../utils/services";
import { DownloadFile } from "../Supabase/downloadFile";
import { pushWorkerUpdate } from "../../server";

const worker = new Worker(
  "Code",
  async (job) => {
    let testcasePassed = 1;
    const data = job.data;
    console.log(data);
    const HiddenTestCase = await GetHiddenTest(data.problemId);
    const VisibleTestCase = await GetVisibleTest(data.problemId);
    console.log(HiddenTestCase);
    console.log(VisibleTestCase);
    // pushWorkerUpdate(data.userId, `Test ${testcasePassed} passed`);
    for (const test of VisibleTestCase) {
      const input = await DownloadFile(test.inputPath);
      const output = await DownloadFile(test.outputPath);
      data.stdin = input;
      const token = await submitCode(data);
      let result = await getResult(token);
      console.log(result);
      while (result.status.description === "Processing") {
        result = await getResult(token);
        console.log(result);
      }
      console.log(JSON.stringify(output));
      console.log(JSON.stringify(result.stdout));
      if (output === result.stdout.trim()) {
        testcasePassed++;
        // pushWorkerUpdate(data.userId, `Test ${testcasePassed} passed`);
      } else {
        // pushWorkerUpdate(
        //   data.userId,
        //   `Testcase failed at ${testcasePassed + 1}`,
        // );
        console.log("testCase failed At ", testcasePassed);
        return `testCase failed At ${testcasePassed}`;
      }
    }
    for (const test of HiddenTestCase) {
      const input = await DownloadFile(test.inputPath);
      const output = await DownloadFile(test.outputPath);
      data.stdin = input;
      const token = await submitCode(data);
      console.log(token);
      console.log("hel");
      let result = await getResult(token);
      while (result.status.description === "Processing") {
        result = await getResult(token);
      }

      console.log(JSON.stringify(output));
      console.log(JSON.stringify(result.stdout));

      if (output === result.stdout.trim()) {
        testcasePassed++;
        // pushWorkerUpdate(data.userId, `Test ${testcasePassed} passed`);
      } else {
        // pushWorkerUpdate(
        //   data.userId,
        //   `Testcase failed at ${testcasePassed + 1}`,
        // );
        console.log("testCase failed At ", testcasePassed);
        return `testCase failed At ${testcasePassed}`;
      }
      console.log(result);
    }
    return console.log("TestCase passed : ", testcasePassed);
  },
  {
    connection: {
      host: "localhost",
      port: 6379,
    },
  },
);
