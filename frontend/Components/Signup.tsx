import { useRef, useState } from "react";
import { Close } from "../lib/close";
import { Eye } from "../lib/eye";

import { EyeClosed } from "../lib/eyeClosed";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { BACKEND_URL } from "../Auth/role";


export function Signup() {
  const navigate = useNavigate();
  const [ShowPass, setShowPass] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLInputElement>(null);

  function ShowPassword() {
    setShowPass((ShowPass) => !ShowPass);
  }
  function Signup() {
    const email = emailRef.current?.value;
    const name = nameRef.current?.value;
    const password = passwordRef.current?.value;
    const role = roleRef.current?.value;

    async function update() {
      const res = await axios.post(`${BACKEND_URL}/auth/signup`, {
        name: name,
        email: email,
        password: password,
        role: role?.toUpperCase(),
      });
      if (res) {
        alert("Signed up");
        navigate("/login", { replace: true });
      }
    }
    update();
  }
  return (
    <>
      <div className="flex my-35 mx-100 absolute">
        <div className="bg-white/90 backdrop-blur-xs   h-150 w-180 rounded-2xl p-2 border-solid border-black/60 border ">
          <div className=" h-48 border-black ">
            <div className="h-11 w-full flex justify-between items-center ">
              <div className=" text-xl  h-10 w-50 flex justify-center items-center ml-10 pointer-events-none ">
                Create Acccount
              </div>
              <div className=" select-none h-10 w-20 flex justify-center items-center">
                <div className="cursor-pointer hover:text-black/50">
                  <Link to="/">
                    <Close />
                  </Link>
                </div>
              </div>
            </div>

            <div className=" h-46  border-black mt-10 ">
              <div className="h-3 w-full  flex items-center justify-end pr-36 pt-3 font-thin text-sm">
                Required Fields*
              </div>
              <div className="h-3 w-full  flex items-center justify-start pl-38 font-thin text-sm">
                Email*
              </div>
              <div className=" h-14 flex justify-center items-center mb-2">
                <input
                  ref={emailRef}
                  className=" h-12 w-100 border border-black/50 rounded  flex items-center px-2 hover:border-black focus:outline-black "
                  placeholder="Email"
                  type="text"
                  name=""
                  id=""
                />
              </div>
              <div className="h-3 w-full  flex items-center justify-start pl-38 font-thin text-sm">
                Name*
              </div>
              <div className=" h-14 flex justify-center items-center mb-2">
                <input
                  ref={nameRef}
                  className=" h-12 w-100 border border-black/50 rounded  flex items-center px-2 hover:border-black focus:outline-black "
                  placeholder="Name"
                  type="text"
                  name=""
                  id=""
                />
              </div>
              <div className="h-3 w-full  flex items-center justify-start pl-38 font-thin text-sm">
                Password*
              </div>
              <div className=" h-14 flex justify-center items-center">
                {ShowPass ? (
                  <>
                    <input
                      ref={passwordRef}
                      className=" h-12 w-100 border border-black/50 rounded  flex items-center px-2 hover:border-black focus:outline-black"
                      placeholder="Password"
                      type="text"
                      name=""
                      id=""
                    />
                    <button
                      onClick={ShowPassword}
                      className="cursor-pointer absolute flex items-center ml-88 focus:outline-black"
                    >
                      <Eye />
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      ref={passwordRef}
                      className=" h-12 w-100 border border-black/50 rounded   flex items-center px-2 hover:border-black focus:outline-black"
                      placeholder="Password"
                      type="password"
                      name=""
                      id=""
                    />
                    <button
                      onClick={ShowPassword}
                      className="cursor-pointer absolute flex items-center ml-88 focus:outline-black"
                    >
                      <EyeClosed />
                    </button>
                  </>
                )}
              </div>
              <div className="h-3 w-full  flex items-center justify-start pl-38 font-thin text-sm">
                Role*
              </div>
              <div className=" h-14 flex justify-center items-center mb-2">
                <input
                  ref={roleRef}
                  className=" h-12 w-100 border border-black/50 rounded  flex items-center px-2 hover:border-black focus:outline-black "
                  placeholder="USER or ADMIN"
                  type="text"
                  name=""
                  id=""
                />
              </div>
            </div>

            <div className=" h-50  border-black ">
              <div className="  h-32 mt-35 border-t border-slate-500 font-thin m-40">
                <div className=" h-18 flex justify-center items-center">
                  <Link to="/signup">
                    <button
                      onClick={Signup}
                      className="h-12 w-80 bg-black text-white rounded-4xl font-medium hover:border hover:border-gray-300 cursor-pointer"
                    >
                      Create Account
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
