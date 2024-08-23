import React from "react";
import Navbar from "./JSX_Components/Navbar/Navbar.jsx";
import Footer from "./JSX_Components/Footer/Footer.jsx";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
