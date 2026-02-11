import { useEffect, useState } from "react";
import { MySolutionBar } from "../Components/Mysolution";
import axios from "axios";
import { getAccessToken } from "../Auth/Tokens";
import { BACKEND_URL } from "../Auth/role";
export interface Submissiontype {
  language: string;
  status: string;
  runtime: number;
  memory: number;
  createdAt: Date;
  user: {
    name: string;
  };
  problem: {
    title: string;
  };
}
export function MySubmission() {
  const [data, setData] = useState<Submissiontype[]>([]);

  useEffect(() => {
    async function getSubmission() {
      const result = await axios.get(
        `${BACKEND_URL}/get/getMySubmission`,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        },
      );

      setData(result.data);
    }
    getSubmission();
  }, []);
  return (
    <>
      <div className="w-screen h-screen  ">
        <div className="   min-h w-full my-25 flex justify-center ">
          <div className=" w-350   my-5 rounded grid gap-2 p-2 border border-white/40   ">
            <div className="h-13 w-full  border border-white/40 rounded flex justify-center items-center gap-1 text-red-500 bg-white/10 font-semibold mask-t-from-neutral-100 ">
              <div className=" h-12 w-48 border-r border-white/40 flex justify-center items-center text-xl">
                When
              </div>
              <div className=" h-12 w-48 border-r border-white/40 flex justify-center items-center text-xl">
                Who
              </div>
              <div className=" h-12 w-48 border-r border-white/40 flex justify-center items-center text-xl">
                Problem
              </div>
              <div className=" h-12 w-48 border-r border-white/40 flex justify-center items-center text-xl">
                Lang
              </div>
              <div className=" h-12 w-48 border-r border-white/40 flex justify-center items-center text-xl">
                Verdict
              </div>
              <div className=" h-12 w-48 border-r border-white/40 flex justify-center items-center text-xl">
                Time
              </div>
              <div className=" h-12 w-48   flex justify-center items-center text-xl">
                Memory
              </div>
            </div>
            {data.map((item, index) => {
              return (
                <MySolutionBar
                  key={index}
                  when={item.createdAt}
                  who={item.user.name}
                  problem={item.problem.title}
                  lang={item.language}
                  memory={item.memory}
                  time={item.runtime}
                  status={item.status}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
