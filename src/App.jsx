import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import Header from "./components/header/Header";
import About from "./components/about/About";
import Experience from "./components/experience/Experience";
import Portfolio from "./components/portfolio/Portfolio";
import Contact from "./components/contact/Contact";
import PortfolioOverview from "./components/portfolio/PortfolioOverview";
import ProjectForm from "./components/projects/ProjectForm";
import Confirmation from "./auth/Confirmation";

// import Dashboard from "./admin/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<SectionsApp />} />
          <Route path="/overview" element={<PortfolioOverview />} />
          <Route path="/update" element={<Confirmation />} />
          <Route path="/project" element={<ProjectForm />} />
        </Route>

        {/* <Route path="/admin" element={<Dashboard />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

const SectionsApp = () => {
  return (
    <div>
      <section id="home">
        <Header />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="experience">
        <Experience />
      </section>
      <section id="portfolio">
        <Portfolio />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </div>
  );
};


export default App;
