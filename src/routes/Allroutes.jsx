import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from '../pages/Home'
import Login from '../pages/Login'
import { OpenChat } from '../pages/OpenChat'

export const Allroutes = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  return (
    <Routes>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/" element={<Login setUser={setUser} />}></Route>
      <Route path="/home/:email" element={<OpenChat />}></Route>
    </Routes>
  );
}
