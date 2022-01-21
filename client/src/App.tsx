import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
