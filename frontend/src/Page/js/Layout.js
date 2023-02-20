import React from "react";
import { Outlet } from "react-router-dom";
import NavLog from "../../Components/js/AuthNavbar ";
import NavNotLog from "../../Components/js/NotAuthNavbar ";

const Layout = () => {
  if(window.location.pathname === '/login') {
    return (
      <>
        <NavNotLog />
        <Outlet />
      </>
    );
  }
  else {
    return (
      <>
        <NavLog />
        <Outlet />
      </>
    );
  }
};

export default Layout;