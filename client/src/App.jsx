import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getRoutes  } from './routes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';
import ScrollToTop from "./ScrollToTop";
import { useState, useEffect } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(1);

  useEffect(() => {
    // Check if user is logged in (e.g., check for token in localStorage)
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  const routes  = getRoutes(isLoggedIn, setIsLoggedIn);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <ScrollToTop />
      
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              
              element={
                <Suspense fallback={<LoadingSpinner />}   >
                  {route.element}
                </Suspense>
              }
            />
            
          ))}
        </Routes>
        
      
      <Footer />
    </>
  );
}

export default App;