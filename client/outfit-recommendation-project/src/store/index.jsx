import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './userSlice'
import { planReducer } from './planSlice'

const store = configureStore({
    reducer: {
      // Define a top-level state field named `todos`, handled by `todosReducer`
      user: userReducer,
      plan : planReducer
    }
  })
  
  export default store