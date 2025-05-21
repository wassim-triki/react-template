import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';

//Lazy load the Home component
const Home = React.lazy(() => import('./pages/Home'));

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Add your routes here */}
        <Route path="/" element={<Home />} />
        {/* Example: <Route path="/about" element={<About />} /> */}
      </Routes>
    </>
  );
}

export default App;
