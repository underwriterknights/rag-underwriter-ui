import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Welcome from './components/Welcome'
import Register from './components/Register'
import Header from './components/Header'
import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const [count, setCount] = useState(0)
  const [loggedUser, setLoggedUser] = useState(null);
  
  return (
    <>
    
    <Header loggedUser={loggedUser}></Header>
     <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        
                        element={
                       <Welcome loggedUser={loggedUser}/>
                        }
                    />
                    <Route
                        path="/register"
                        element={<Register />}
                    />
                     <Route
                        path="/login"
                        element={<Login setLoggedUser={setLoggedUser} />}
                    />
                      <Route
                        path="/home"
                        // element={ <ProtectedRoute loggedUser={loggedUser}>
                        //     <Home loggedUser={loggedUser}/> 
                        // </ProtectedRoute>}

                        element={
                          <Home loggedUser={loggedUser}/> 
                        }
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