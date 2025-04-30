import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Login from './pages/Login'
import Register from './pages/register'
import Home from './pages/Home'

function App() {

  return (
    <>
      
      <BrowserRouter>
        
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/' element={<Home/>} />
        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App
