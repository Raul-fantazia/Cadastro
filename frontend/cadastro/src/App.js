import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Componentes/Login';
import CriarConta from './Componentes/CriarConta';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/criar-conta" element={<CriarConta/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;