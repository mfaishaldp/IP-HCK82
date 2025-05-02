import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Swal from 'sweetalert2'

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
        state.error = action.payload
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
            url: 'https://p2-ip.mfaishaldp.my.id/register',
            data: {
                "username" : payload.username,
                "email" : payload.email,
                "password" : payload.password
            }
        });

        dispatch(fetchUserSuccess(response.data))


  } catch (error) {
        // dispatch(fetchUserError(error.response?.data?.message))
        Swal.fire({
            title: 'Error!',
            text: error.response?.data?.message,
            icon: 'error',
            confirmButtonText: 'Close'
        })
  }
})

export const fetchUserLogin = createAsyncThunk('/login', async (payload,{dispatch}) => {
    try {

        dispatch(fetchUserStart())

        const response = await axios({
            method: 'post',
            url: 'https://p2-ip.mfaishaldp.my.id/login',
            data: {
              username: payload.username,
              password: payload.password
            }
        });

        localStorage.setItem("access_token",response.data.access_token)

        dispatch(fetchUserSuccess(response.data))


    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: error.response?.data?.message,
            icon: 'error',
            confirmButtonText: 'Close'
        })
    }
})