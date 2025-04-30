import { useEffect, useState } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { fetchPlanGetLonLat,fetchPlanGetLocName } from "../store/planSlice"

export default function Home () {

    const dispatch = useDispatch()
    const {items : dataPlan, loading, error} = useSelector(data => data.plan)

    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')

    const [currLoc, setCurrLoc] = useState({})

    async function getCurrLocation () {
        try {
            const position = await new Promise((resolve, reject) =>
                navigator.geolocation.getCurrentPosition(resolve, reject)
            );
            
            const resultCurr = await dispatch(fetchPlanGetLocName({
                lat : position.coords.latitude,
                lon : position.coords.longitude,
            })).unwrap()

            setCurrLoc(resultCurr)

        } catch (error) {
            throw error
        }
    }


    useEffect(() => {
        getCurrLocation()
    },[])

    return (
        <>

            <div className="h-screen">
                <p>Current Location : {currLoc.city} , Country : {currLoc.country}, latitude : {currLoc.latitude}, longitude : {currLoc.longitude} </p>

                {
                    dataPlan.latitude === currLoc.latitude && dataPlan.longitude === currLoc.longitude ?
                        null
                        :
                        <p>Destination Location : {dataPlan.city} , Country : {dataPlan.country}, latitude : {dataPlan.latitude}, longitude : {dataPlan.longitude} </p>
                }


                <form onSubmit={ async (event) => {
                    event.preventDefault();
                    await dispatch(fetchPlanGetLonLat({
                        city : city,
                        country : country
                    })).unwrap()
                }}
                    className="flex gap-4"
                >
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">City</legend>
                        <input type="text" className="input" placeholder="City" onChange={(event) => {setCity(event.target.value)}}/>
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Country</legend>
                        <input type="text" className="input" placeholder="Country" onChange={(event) => {setCountry(event.target.value)}}/>
                    </fieldset>
                    <button className="btn btn-neutral mt-4 bg-color-green-dark" type='submit' >Submit</button>
                </form>
            </div>

            


        </>
    )
}