import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import Navbar from './components/Navbar';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';



function App() {
  return (
    <>
      <Navbar />
      
      <Suspense fallback={<LoadingSpinner />}> 
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={route.element}
            />
          ))}
        </Routes>
      </Suspense>
    </>
  );
}

export default App;