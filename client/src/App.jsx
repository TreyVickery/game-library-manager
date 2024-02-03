import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Dashboard from './components/dashboard';
import Create from './components/create';
import Edit from './components/edit';  
import Game from './components/game';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<Create />} />
        <Route path="game/edit/:gameId" element={<Edit />} />
        <Route path="/game/:gameId" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;



