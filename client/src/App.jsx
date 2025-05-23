import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';
import ScrollToTop from "./ScrollToTop";






function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <Suspense fallback={<LoadingSpinner />}>
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