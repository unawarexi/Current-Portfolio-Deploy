import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import Header from "./components/header/Header";
import About from "./components/about/About";
import Experience from "./components/experience/Experience";
import Portfolio from "./components/portfolio/Portfolio";
import Contact from "./components/contact/Contact";
import PortfolioOverview from "./components/portfolio/PortfolioOverview";
import TabbedForm from "./components/projects/TabbedForm";
import Confirmation from "./auth/Confirmation";
import SinglePortfolio from "./components/portfolio/SinglePortfolio";
import { PortfolioProvider } from './context/PortfolioContext';

// Scroll to hash component
const ScrollToHash = () => {
  const location = useLocation();
  
  useEffect(() => {
    // If there's a hash in the URL, scroll to that element
    if (location.hash) {
      const id = location.hash.substring(1); // Remove the # character
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If no hash, scroll to top
      window.scrollTo(0, 0);
    }
  }, [location]);
  
  return null;
};

const ProtectedRoute = ({ children }) => {
  const authData = JSON.parse(localStorage.getItem('authValid'));
  const isAuthenticated = authData?.valid && Date.now() < authData.expiresAt;

  return isAuthenticated ? children : <Navigate to="/auth" />;
};

const App = () => {
  return (
    <PortfolioProvider>
      <Router basename="/">
        <ScrollToHash />
        <Routes>
          {/* Main layout wraps all routes */}
          <Route element={<MainLayout />}>
            {/* Home route */}
            <Route path="/" element={<SectionsApp />} />
            
            {/* Other routes */}
            <Route path="/projects" element={<PortfolioOverview />} />
            <Route path="/projects/:id" element={<SinglePortfolio />} />
        

          {/* Auth and project form flow */}
          <Route path="/auth" element={<Confirmation />} />
          <Route
            path="/auth/new"
            element={
              <ProtectedRoute>
                <TabbedForm />
              </ProtectedRoute>
            }
          />
          </Route>
        </Routes>
      </Router>
    </PortfolioProvider>
  );
};

const SectionsApp = () => {
  return (
    <div>
      {/* Sections with IDs for navigation */}
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