import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import Swal from 'sweetalert2'
import axios from 'axios'


const planSlice = createSlice({
  name: 'plan',
  initialState : {
    items : {},
    temps : {},
    itemsGemini : {},
    loading : '',
    error : ''
  },
  reducers: {
    fetchPlanStart(state, action) {
        state.loading = true
        state.error = ''
    },
    fetchPlanSuccess(state, action) {
        state.loading = false
        state.items = action.payload
    },
    fetchPlanSuccessTemperature(state, action) {
        state.loading = false
        state.temps = action.payload
    },
    fetchPlanSuccessGemini(state, action) {
        state.loading = false
        state.itemsGemini = action.payload
    },
    fetchPlanError(state, action) {
      state.loading = false
      state.error = action.payload
    }
  }
})

export const { fetchPlanStart, fetchPlanSuccess, fetchPlanError, fetchPlanSuccessTemperature, fetchPlanSuccessGemini } = planSlice.actions
export const planReducer = planSlice.reducer

export const fetchPlanGetLocName = createAsyncThunk('/data/get-location-name', async (payload,{dispatch}) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://localhost:3000/data/get-location-name',
            params : {
                lat : payload.lat,
                lon : payload.lon,
            },
            headers : {
                Authorization : 'Bearer ' + localStorage.getItem("access_token")
            }
        });

        dispatch(fetchPlanSuccess(response.data))

        return response.data
        

    } catch (error) {
        console.log(error);
        
        Swal.fire({
            title: 'Error!',
            text: error.response?.data?.message,
            icon: 'error',
            confirmButtonText: 'Close'
        })
    }
    
})

export const fetchPlanGetLonLat = createAsyncThunk('/data/get-lon-lat', async (payload,{dispatch}) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://localhost:3000/data/get-lon-lat',
            params : {
                city : payload.city,
                country : payload.country,
            },
            headers : {
                Authorization : 'Bearer ' + localStorage.getItem("access_token")
            }
        });

        dispatch(fetchPlanSuccess(response.data))

    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: error.response?.data?.message,
            icon: 'error',
            confirmButtonText: 'Close'
        })
    }
})

export const fetchPlanGetTemperature = createAsyncThunk('/data/get-temperature', async (payload, {dispatch}) => {
    try {

        const response = await axios({
            method: 'get',
            url: 'http://localhost:3000/data/get-temperature',
            params: {
              latitude: payload.latitude,
              longitude: payload.longitude
            },
            headers : {
                Authorization : 'Bearer ' + localStorage.getItem("access_token")
            }
        });

        dispatch(fetchPlanSuccessTemperature(response.data))

        return response.data

    } catch (error) {

        Swal.fire({
            title: 'Error!',
            text: error.response?.data?.message,
            icon: 'error',
            confirmButtonText: 'Close'
        })
    }
})

export const fetchPlanGetGemini = createAsyncThunk('/data/gemini', async (payload, {dispatch}) => {
    try {


        const response = await axios({
            method: 'get',
            url: 'http://localhost:3000/data/gemini',
            params: {
              temperature: payload.temperature
            },
            headers : {
                Authorization : 'Bearer ' + localStorage.getItem("access_token")
            }
        });

        dispatch(fetchPlanSuccessGemini(response.data))

        return response.data

    } catch (error) {

        Swal.fire({
            title: 'Error!',
            text: error.response?.data?.message,
            icon: 'error',
            confirmButtonText: 'Close'
        })
    }
})

