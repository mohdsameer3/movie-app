import React from 'react'
import Home from './Components/Home'
import { Routes,Route } from 'react-router-dom';
import MovieDetails from './Components/MoiveDetails';
import Navbar from './Components/Navbar';
import About from './Components/About';
import Trending from './Components/Trending';
import { Suspense, lazy } from "react";

const App = () => {
  return (
  <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
       <Route
          path="/movie/:id"
          element={
            <Suspense fallback={<div className="py-10 text-center text-white">Loading...</div>}>
              <MovieDetails />
            </Suspense>
          }
        />
        <Route path='/about' element={<About/>}/>
        <Route path='/trending' element={<Trending/>}/>
      </Routes>

  </>
    
  )
}

export default App;
