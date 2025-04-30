import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Login from './pages/Login'
import Register from './pages/register'

function App() {

  return (
    <>
      
      <BrowserRouter>
        
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          {/* <Route path='/' element={<Register/>} /> */}
        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App
