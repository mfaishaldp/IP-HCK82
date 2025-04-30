import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const userSlice = createSlice({
  name: 'user',
  initialState : {
    items : [],
    loading : false,
    error : ''
  },
  reducers: {
    fetchUserStart(state, action) {
        state.loading = true
        state.error = ''
    },
    fetchUserSuccess(state, action) {
        state.loading = false
        state.items = action.payload //! buat ngambil item dari response, dengan trigger dispatch lalu invoke (data)
    },
    fetchUserError(state, action) {
        state.loading = false
        state.error = action.payload?.message
    }
  }
})

export const { fetchUserStart, fetchUserSuccess, fetchUserError } = userSlice.actions
export const userReducer = userSlice.reducer


export const fetchUserRegister = createAsyncThunk('/register', async (payload, {dispatch}) => {
    try {
        // console.log(payload);
        // console.log("masuk");
        
        dispatch(fetchUserStart())

        const response = await axios({
            method: 'post',
            url: 'http://localhost:3000/register',
            data: {
                "username" : payload.username,
                "email" : payload.email,
                "password" : payload.password
            }
        });

        dispatch(fetchUserSuccess(response.data))
  } catch (error) {
        dispatch(fetchUserError(error.response?.data?.message))
  }
})

