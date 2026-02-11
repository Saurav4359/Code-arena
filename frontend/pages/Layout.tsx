import { NavBar } from "../Components/header";

import { Outlet } from "react-router";
export function Layout() {
  return (
    <>
      <NavBar />
      <Outlet/>
    
    </>
  );
}
