// import React, { useState } from 'react'
// import { Route } from 'react-router-dom'
import Index from './pages/Index'
import About from './pages/About'
import User from './pages/User'
import NotFound from './pages/NotFound'
import './App.css'
/* function App() {
  return (
    <div>
      <Route path="/" exact component={Index}></Route>
      <Route path="/about" exact component={About}></Route>
    </div>
  )
} */

export default [
  {
    path: '/',
    component: Index,
    exact: true,
    key: 'index'
  },
  {
    path: '/about',
    component: About,
    exact: true,
    key: 'about'
  },
  {
    path: '/user',
    component: User,
    exact: true,
    key: 'user'
  },
  {
    component: NotFound,
    key: '404'
  }
]
