import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import FloatingNavBar from "../components/nav/FloatingNav";

const MainLayout = () => {
  return (
    <>
      <NavBar />
      {/* Ensure FloatingNavBar uses navigation links */}
      <FloatingNavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
x