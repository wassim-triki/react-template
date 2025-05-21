import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//Lazy load the Home component
const Home = React.lazy(() => import('./pages/Home'));

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>My React App</h1>
        </header>
        <main>{/* Add your routes here */}</main>
        <footer className="App-footer">
          <p>&copy; 2023 My React App</p>
        </footer>
      </div>

      {/* Add your routes here */}
      <Route path="/" element={<Home />} />
      {/* Example: <Route path="/about" element={<About />} /> */}
    </Router>
  );
}

export default App;
