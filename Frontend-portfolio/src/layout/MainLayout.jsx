import React from 'react';
import NavBar from '@layout/NavBar';
import Footer from '@layout/Footer';
import FloatingNavBar from '@landing/nav/FloatingNav';
import { ToastContainer } from '@components/ui/ToastContainer';

const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-transparent transition-colors duration-300">
      <NavBar />
      <FloatingNavBar />
      <ToastContainer />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
