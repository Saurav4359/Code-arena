import { NavBar } from "./header";

import { Outlet } from "react-router";
export function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
