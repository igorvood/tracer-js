import React from 'react'
import {Routes, Route} from 'react-router-dom'
import {HomePage} from './pages/HomePage'

import {Navigation} from './components/Navigation'
import {TracerPage} from "./pages/TracerPage";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/favourites" element={ <TracerPage /> } />
      </Routes>
    </>
  )
}

export default App
