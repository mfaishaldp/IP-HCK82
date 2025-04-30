import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './userSlice'

const store = configureStore({
    reducer: {
      // Define a top-level state field named `todos`, handled by `todosReducer`
      user: userReducer
    }
  })
  
  export default store