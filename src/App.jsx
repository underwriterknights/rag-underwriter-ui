import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Welcome from './components/Welcome'
import Register from './components/Register'
import Header from './components/Header'
import Login from './components/Login'
import Home from './components/Home'

function App() {
  const [count, setCount] = useState(0)


  return (
    <>
    
    <Header></Header>
     <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<Welcome />}
                    />
                    <Route
                        path="/register"
                        element={<Register />}
                    />
                     <Route
                        path="/login"
                        element={<Login />}
                    />
                      <Route
                        path="/Home"
                        element={<Home />}
                    />
                </Routes>
            </BrowserRouter>     

  <div  className='divFooter'>
        <h1></h1>
      </div>
    </>
  )
}

export default App
