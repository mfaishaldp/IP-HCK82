import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import Swal from 'sweetalert2'
import axios from 'axios'


const planSlice = createSlice({
  name: 'plan',
  initialState : {
    items : {},
    temps : {},
    itemsGemini : {},
    itemsAdd : {},
    itemsPlanByUserId : [],
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
    fetchPlanSuccessAdd(state, action) {
        state.loading = false
        state.itemsAdd = action.payload
    },
    fetchPlanSuccessGetPlanByUserId(state, action) {
        state.loading = false
        state.itemsPlanByUserId = action.payload
    },
    fetchPlanError(state, action) {
      state.loading = false
      state.error = action.payload
    }
  }
})

export const { fetchPlanStart, fetchPlanSuccess, fetchPlanError, fetchPlanSuccessTemperature, fetchPlanSuccessGemini, fetchPlanSuccessAdd, fetchPlanSuccessGetPlanByUserId } = planSlice.actions
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

export const fetchPlanAdd = createAsyncThunk('/add-plan', async (payload, {dispatch}) => {
    try {

        const response = await axios({
            method: 'post',
            url: 'http://localhost:3000/plan/add-plan',
            data: {
                "longitudeLocation": payload.longitudeLocation,
                "latitudeLocation": payload.latitudeLocation,
                "displayNameLocation": payload.displayNameLocation,
                "longitudeDestination": payload.longitudeDestination,
                "latitudeDestination": payload.latitudeDestination,
                "displayNameDestination": payload.displayNameDestination,
                "recommendationItems" : payload.recommendationItems,
                "timeTemperaturePredicted" : payload.timeTemperaturePredicted,
                "StatusId" : 1
            },
            headers : {
                Authorization : 'Bearer ' + localStorage.getItem("access_token")
            }
        });

        dispatch(fetchPlanSuccessAdd(response.data))

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

export const fetchPlanGetPlanByUserId = createAsyncThunk('/add-plan', async (payload, {dispatch}) => {
    try {

        const response = await axios({
            method: 'get',
            url: 'http://localhost:3000/plan/user',
            headers : {
                Authorization : 'Bearer ' + localStorage.getItem("access_token")
            }
        });

        dispatch(fetchPlanSuccessGetPlanByUserId(response.data))

    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: error.response?.data?.message,
            icon: 'error',
            confirmButtonText: 'Close'
        })
    }
})

export const fetchPlanDelPlanById = createAsyncThunk('/plan/:id', async (payload, {dispatch}) => {
    try {

        const response = await axios({
            method: 'delete',
            url: 'http://localhost:3000/plan/'+payload.id,
            headers : {
                Authorization : 'Bearer ' + localStorage.getItem("access_token")
            }
        });

    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: error.response?.data?.message,
            icon: 'error',
            confirmButtonText: 'Close'
        })
    }
})

export const fetchPlanPutStatus = createAsyncThunk('/plan/:id', async (payload, {dispatch}) => {
    try {

        const response = await axios({
            method: 'put',
            url: 'http://localhost:3000/plan/'+payload.id,
            data : {
                statusId : payload.statusId
            },
            params : {
                id : payload.id
            },
            headers : {
                Authorization : 'Bearer ' + localStorage.getItem("access_token")
            }
        });

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