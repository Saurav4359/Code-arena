import { Link } from "react-router";

export function NavBar() {
  return (
    // <header className="bg-[#050505] h-18 w-full "> </header>
    <header className="  h-15 w-min flex justify-between items-center fixed   border-black mx-25 my-5 rounded-3xl backdrop-blur-xs inset-0  bg-linear-to-bl from-[#ceff8a]/90 to-[#9bffd7]/90">
      <div className="ml-40  h-16 w-70 font-semibold flex justify-center items-center text-3xl subpixel-antialiased  tracking-tighter hover:cursor-text">
        CodeNest
      </div>
      <div className=" mr-20 h-14 w-180 flex justify-center items-center gap-8 mt-1">
        <div className="text-l font-medium hover:cursor-pointer h-8 w-20 rounded-2xl flex justify-center items-center hover:bg-black hover:text-white hover:transition delay-75 duration-100 ease-in">
          Premium
        </div>
        <div className="text-l font-medium hover:cursor-pointer h-8 w-20 rounded-2xl flex justify-center items-center hover:bg-black hover:text-white hover:transition delay-75 duration-100 ease-in">
          Explore
        </div>
        <div className="text-l font-medium hover:cursor-pointer h-8 w-20 rounded-2xl flex justify-center items-center hover:bg-black hover:text-white hover:transition delay-75 duration-100 ease-in">
          Problems
        </div>
        <div className="text-l font-medium hover:cursor-pointer h-8 w-20 rounded-2xl flex justify-center items-center hover:bg-black hover:text-white hover:transition delay-75 duration-100 ease-in">
          Contests
        </div>
        <div
          
          className="text-l font-medium hover:cursor-pointer h-8 w-20 rounded-2xl flex justify-center items-center hover:bg-black hover:text-white hover:transition delay-75 duration-100 ease-in"
        >
          <Link to="/signup"> Sign In</Link>
        </div>
      </div>
    </header>
  );
}
