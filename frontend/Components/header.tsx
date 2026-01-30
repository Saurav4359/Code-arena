export function NavBar() {
  return (
    // <header className="bg-[#050505] h-18 w-full "> </header>
    <header className="bg-linear-to-bl from-[#c3fc79] to-[#ffffa9] h-18 w-full flex justify-between items-center fixed border-b-2 border-black ">
      <div className="ml-40  h-16 w-70 font-semibold flex justify-center items-center text-4xl subpixel-antialiased  -tracking-wider hover:cursor-text">
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
        <div className="text-l font-medium hover:cursor-pointer h-8 w-20 rounded-2xl flex justify-center items-center hover:bg-black hover:text-white hover:transition delay-75 duration-100 ease-in">
          Sign In
        </div>
      </div>
    </header>
  );
}
