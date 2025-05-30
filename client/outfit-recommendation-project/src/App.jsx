import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Login from './pages/Login'
import Register from './pages/register'
import Home from './pages/Home'
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import MyPlan from './pages/MyPlan'

function App() {

  return (
    <>
      
      <BrowserRouter>
        
        <Routes>

          <Route element={<AuthLayout/>}>
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
          </Route>

          <Route element={<MainLayout/>}>
            <Route path='/' element={<Home/>} />
            <Route path='/my-plan' element={<MyPlan/>} />
          </Route>
          
        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App
