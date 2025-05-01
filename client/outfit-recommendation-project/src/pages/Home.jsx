import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPlanGetLonLat,fetchPlanGetLocName,fetchPlanGetTemperature } from "../store/planSlice"
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
} from 'chart.js'

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
)

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

            <div className="p-10">
                <Line
                    data = {{
                        labels : Object.keys(currTemp).length !== 0 && currTemp.data.time,
                        datasets : [
                            {
                                label : Object.keys(currLoc).length !== 0 && `Forecast Temp ${currLoc.city}, ${currLoc.country} in °C`,
                                data : Object.keys(currTemp).length !== 0 && currTemp.data.temperature,
                                borderColor : '#BF9264',
                                backgroundColor : '#F0F1C5',
                                pointBackgroundColor : '#F0F1C5',
                                tension : 0.4
                            },
                            Object.keys(dataLoc).longitude !== 0 && dataLoc.longitude !== currLoc.longitude ?
                            {
                                // label : Object.keys(dataLoc).length !== 0 && `Forecast Temp ${dataLoc.city}, ${dataLoc.country} in °C`,
                                label : Object.keys(dataLoc).longitude !== 0 && `Forecast Temp ${dataLoc.city}, ${dataLoc.country} in °C`,
                                data : Object.keys(dataTemps).length !== 0 && dataTemps.data.temperature,
                                borderColor : '#6F826A',
                                backgroundColor : '#BBD8A3',
                                pointBackgroundColor : '#BBD8A3',
                                tension : 0.4
                            } : 
                            {
                                label : "Please Choose Destination Location"
                            }
                        ]
                    }}
                    plugins={[
                        {
                            id: 'custom_canvas_background_color',
                            beforeDraw: (chart) => {
                                const { ctx } = chart;
                                ctx.save();
                                ctx.globalCompositeOperation = 'destination-over';
                                ctx.fillStyle = '#f5f5f5'; // Change this to any color you want
                                ctx.fillRect(0, 0, chart.width, chart.height);
                                ctx.restore();
                            }
                        }
                    ]}
                ></Line>
            </div>


            {/* <div className="h-screen"> */}
            <div className="">

                <div className="text-center">
                    <p>Current Location : {currLoc.city} , Country : {currLoc.country}, latitude : {currLoc.latitude}, longitude : {currLoc.longitude} </p>

                    {
                        dataLoc.latitude === currLoc.latitude && dataLoc.longitude === currLoc.longitude ?
                            null
                            :
                            <p>Destination Location : {dataLoc.city} , Country : {dataLoc.country}, latitude : {dataLoc.latitude}, longitude : {dataLoc.longitude} </p>
                    }
                </div>
                


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