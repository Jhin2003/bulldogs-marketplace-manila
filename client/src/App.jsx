import { useState } from 'react'
import Login from './components/login';
import Home from './Components/Home';

import { SearchProvider } from './context/SearchContext';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.scss"
const App = () => {
  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<>
          <SearchProvider>
           <Home/>

          </SearchProvider>
         
        </>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
