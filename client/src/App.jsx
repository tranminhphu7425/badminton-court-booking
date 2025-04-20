import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navigation from './components/Navigation';

import About from './pages/About';
import Home from './pages/Home';
import Badminton from './pages/Badminton';
import './App.css';

function App () {
  return (
    <Router>
      <div className='App'>
        <Navigation />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/booking" element={<Badminton />} />
        </Routes>
      </div>
    </Router>

  );



};


export default App;
