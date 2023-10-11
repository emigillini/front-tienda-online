import { Routes, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import './App.css';
import LoginPage from './pages/LoginPage';
import LoginError from "./pages/LoginError"
import RegisterPage from './pages/RegisterPage';

const Home = React.lazy(() => import('./pages/Home'));
const Stripe = React.lazy(() => import('./pages/Stripe'));

function App() {
  return (
    <Suspense fallback="loading">
      <Routes>
        <Route path='' element={<Home />} />
        <Route path='/Login' element={<LoginPage />} />
        <Route path='/Register' element={<RegisterPage />} />
        <Route path='/LoginError' element={<LoginError />} />
        <Route path='/stripe' element={<Stripe />} />
      </Routes>
    </Suspense>
  );
}

export default App;