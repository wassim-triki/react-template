import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Posts from './pages/Posts';

//Lazy load the Home component
const Home = React.lazy(() => import('./pages/Home'));

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Add your routes here */}
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        {/* Example: <Route path="/about" element={<About />} /> */}
      </Routes>
    </>
  );
}

export default App;
