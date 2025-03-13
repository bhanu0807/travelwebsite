import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import SignUp from './components/pages/SignUp';
import ImgNine from './components/pages/ImgNine';
import ImgSecond from './components/pages/ImgSecond';
import ImgThird from './components/pages/ImgThird';
import ImgFourth from './components/pages/ImgFourth';
import ImgFive from './components/pages/ImgFive';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/services' element={<Services/>} />
          <Route path='/products' element={<Products/>} />
          <Route path='/sign-up' element={<SignUp/>} />
          <Route path='/ImgNine' element={<ImgNine/>} />
          <Route path='/ImgSecond' element={<ImgSecond/>} />
          <Route path='/ImgThird' element={<ImgThird/>} />
          <Route path='/ImgFourth' element={<ImgFourth/>} />
          <Route path='/ImgFive' element={<ImgFive/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
