import { useEffect, useState } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { fetchPlanGetLonLat,fetchPlanGetLocName,fetchPlanGetTemperature } from "../store/planSlice"

export default function Home () {

    const dispatch = useDispatch()
    const {items : dataLoc, temps : dataTemps, loading, error} = useSelector(data => data.plan)

    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')

    const [currLoc, setCurrLoc] = useState({})
    const [currTemp, setCurrTemp] = useState({})

    async function getCurrLocation () {
        try {
            const position = await new Promise((resolve, reject) =>
                navigator.geolocation.getCurrentPosition(resolve, reject)
            );
            
            const resCurrLocName = await dispatch(fetchPlanGetLocName({
                lat : position.coords.latitude,
                lon : position.coords.longitude,
            })).unwrap()

            setCurrLoc(resCurrLocName)

        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        getCurrLocation()
    },[])

    useEffect(() => {
        if (Object.keys(currLoc).length !== 0) {
            const fetchTemp = async () => {
                const resCurrTemp = await dispatch(fetchPlanGetTemperature({
                    latitude : currLoc.latitude,
                    longitude : currLoc.longitude
                })).unwrap()
                setCurrTemp(resCurrTemp)
            }
            fetchTemp()
        }
    }, [currLoc])

    useEffect(() => {
        if (Object.keys(currLoc).length !== 0) {
            const fetchNewTemp = async () => {
                await dispatch(fetchPlanGetTemperature({
                    latitude : dataLoc.latitude,
                    longitude : dataLoc.longitude
                })).unwrap()
            }
            fetchNewTemp()
        }
    },[dataLoc])

    return (
        <>

            {console.log(currTemp,"currTemp")}
            {console.log(currLoc,"currLoc")}
            {console.log(dataLoc,"destLoc")}
            {console.log(dataTemps,"destTemp")}

            <div className="h-screen">
                <p>Current Location : {currLoc.city} , Country : {currLoc.country}, latitude : {currLoc.latitude}, longitude : {currLoc.longitude} </p>

                {
                    dataLoc.latitude === currLoc.latitude && dataLoc.longitude === currLoc.longitude ?
                        null
                        :
                        <p>Destination Location : {dataLoc.city} , Country : {dataLoc.country}, latitude : {dataLoc.latitude}, longitude : {dataLoc.longitude} </p>
                }


                <form onSubmit={ async (event) => {
                    event.preventDefault();
                    await dispatch(fetchPlanGetLonLat({
                        city : city,
                        country : country
                    })).unwrap();
                    
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