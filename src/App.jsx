import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import Header from "./components/header/Header";
import About from "./components/about/About";
import Experience from "./components/experience/experience";
import Portfolio from "./components/portfolio/Portfolio";
import Contact from "./components/contact/Contact";

// import Dashboard from "./admin/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<SectionsApp />} />
        </Route>

        {/* <Route path="/admin" element={<Dashboard />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

const SectionsApp = () => {
  return (
    <div>
      <Header />
      <About />
      <Experience />
      <Portfolio />
      <Contact />
      {/* <Nav /> */}
    </div>
  );
};

export default App;
