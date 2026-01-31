// import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}