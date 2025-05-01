import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPlanGetLonLat,fetchPlanGetLocName,fetchPlanGetTemperature,fetchPlanGetGemini,fetchPlanAdd } from "../store/planSlice"
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
import Swal from "sweetalert2"
import { useNavigate } from "react-router"

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
)

export default function Home () {

    const navigate = useNavigate()

    const dispatch = useDispatch()
    const {items : dataLoc, temps : dataTemp, itemsGemini : dataGemini, itemsAdd:dataAdd, loading, error} = useSelector(data => data.plan)

    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')

    const [currLoc, setCurrLoc] = useState({})
    const [currTemp, setCurrTemp] = useState({})

    const [selTempCurr, setSelTempCurr] = useState(0)
    const [selTempDest, setSelTempDest] = useState(0)

    const [selTimeCurr, setSelTimeCurr] = useState('')
    const [selTimeDest, setSelTimeDest] = useState('')

    const [outfitCurr, setOutfitCurr] = useState({})
    const [outfitDest, setOutfitDest] = useState({})

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

            {/* {console.log(currTemp,"currTemp")} */}
            {/* {console.log(currLoc,"currLoc")}
            {console.log(dataLoc,"destLoc")}
            {console.log(dataTemp,"destTemp")}
            {console.log(selTimeCurr,"selTimeCurr")}
            {console.log(selTimeDest,"selTimeDest")} */}

            {/* {console.log(selTempCurr,"selTempCurr")}
            {console.log(selTempDest,"selTempDest")}

            {console.log(outfitCurr," <<<< outfitCurr")}
            {console.log(outfitDest," <<<< outfitDest")} */}

            {/* <h1>{selTempCurr} - sel temp curr</h1> */}

            <div className="p-5">
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
                                label : Object.keys(dataLoc).longitude !== 0 && `Forecast Temp ${dataLoc.city}, ${dataLoc.country} in °C`,
                                data : Object.keys(dataTemp).length !== 0 && dataTemp.data.temperature,
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


            <div className="">

                <div className="flex flex-wrap justify-center gap-6 mt-6">
                    {/* Current Location Card */}
                    <p className="bg-white border border-gray-300 p-5 rounded-lg shadow-lg max-w-sm w-full md:w-1/2 text-gray-700">
                        <span className="block font-semibold text-xl mb-2">
                            Current Location:
                        </span>
                        <span className="block text-gray-900">{currLoc.city}, {currLoc.country}</span>
                        <span className="block mt-2 text-sm text-gray-500">Latitude: {currLoc.latitude}</span>
                        <span className="block text-sm text-gray-500">Longitude: {currLoc.longitude}</span>
                    </p>

                    {/* Destination Location Card */}
                    {
                        dataLoc.latitude === currLoc.latitude && dataLoc.longitude === currLoc.longitude ? 
                            null :
                            <p className="bg-white border border-gray-300 p-5 rounded-lg shadow-lg max-w-sm w-full md:w-1/2 text-gray-700">
                                <span className="block font-semibold text-xl mb-2">
                                    Destination Location:
                                </span>
                                <span className="block text-gray-900">{dataLoc.city}, {dataLoc.country}</span>
                                <span className="block mt-2 text-sm text-gray-500">Latitude: {dataLoc.latitude}</span>
                                <span className="block text-sm text-gray-500">Longitude: {dataLoc.longitude}</span>
                            </p>
                    }
                </div>


                <div className="flex flex-wrap justify-center gap-6 mt-6">
                    {/* First Form */}
                    <form
                        onSubmit={async (event) => {
                            event.preventDefault();
                            await dispatch(fetchPlanGetLonLat({
                                city: city,
                                country: country
                            })).unwrap();
                        }}
                        className="w-full md:w-1/2 lg:w-1/3 p-6 bg-white shadow-lg rounded-lg m-4"
                    >
                        <fieldset className="mb-6">
                            <legend className="text-xl font-semibold text-gray-700 mb-2">Destination City</legend>
                            <input
                                type="text"
                                className="w-full p-3 border border-[#BF9264] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#BF9264]"
                                placeholder="Enter City"
                                onChange={(event) => { setCity(event.target.value) }}
                            />
                        </fieldset>

                        <fieldset className="mb-6">
                            <legend className="text-xl font-semibold text-gray-700 mb-2">Destination Country</legend>
                            <input
                                type="text"
                                className="w-full p-3 border border-[#BF9264] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#BF9264]"
                                placeholder="Enter Country"
                                onChange={(event) => { setCountry(event.target.value) }}
                            />
                        </fieldset>

                        <button
                            className="w-full py-3 bg-[#BF9264] text-white font-semibold rounded-lg hover:bg-[#9F7C57] focus:outline-none focus:ring-2 focus:ring-[#BF9264]"
                            type="submit"
                        >
                            Submit
                        </button>
                        <span className="block text-sm text-gray-500 mt-2">If there are changes please press again</span>
                    </form>

                    {/* Conditional Second Form */}
                    {
                        dataLoc.latitude !== currLoc.latitude && dataLoc.longitude !== currLoc.longitude ?
                        <>
                            <form
                                className="w-full md:w-1/2 lg:w-1/3 p-6 bg-white shadow-lg rounded-lg m-4"
                                onSubmit={async (event) => {
                                    event.preventDefault();
                                    if (selTempCurr === 0 || selTempDest === 0) {
                                        Swal.fire({
                                            title: 'Error!',
                                            text: "Please select time",
                                            icon: 'error',
                                            confirmButtonText: 'Close'
                                        })
                                    } else {
                                        setOutfitCurr(await dispatch(fetchPlanGetGemini({
                                            temperature : selTempCurr
                                        })).unwrap())
                                        setOutfitDest(await dispatch(fetchPlanGetGemini({
                                            temperature : selTempDest
                                        })).unwrap())
                                    }
                                }}
                            >
                                <fieldset className="mb-6 flex gap-2">
                                    <legend className="text-xl font-semibold text-gray-700 mb-2">Current City</legend>
                                    <input
                                        type="text"
                                        className="w-full p-3 border border-[#BF9264] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#BF9264]"
                                        value={currLoc.city}
                                        disabled
                                    />
                                    <select
                                        className="w-full p-3 border border-[#BF9264] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#BF9264]"
                                        onChange={(event) => {
                                            Object.keys(currTemp).length !== 0 && setSelTempCurr(currTemp.data.temperature[event.target.value]) 
                                            Object.keys(currTemp).length !== 0 && setSelTimeCurr(currTemp.data.time[event.target.value])
                                        }}
                                    >
                                        <option value="">Select a Time</option>
                                        {
                                            Object.keys(currTemp).length !== 0 &&
                                            currTemp.data.time.map((el,idx) => {
                                                return <option key={idx} value={idx} >{el}</option>
                                            })
                                        }

                                    </select>

                                </fieldset>

                                <fieldset className="mb-6 flex gap-2">
                                    <legend className="text-xl font-semibold text-gray-700 mb-2">Destination City</legend>
                                    <input
                                        type="text"
                                        className="w-full p-3 border border-[#BF9264] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#BF9264]"
                                        value={dataLoc.city}
                                        disabled
                                    />
                                    <select
                                        className="w-full p-3 border border-[#BF9264] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#BF9264]"
                                        onChange={(event) => {
                                            Object.keys(dataTemp).length !== 0 && setSelTempDest(dataTemp.data.temperature[event.target.value]) 
                                            Object.keys(dataTemp).length !== 0 && setSelTimeDest(dataTemp.data.time[event.target.value])
                                        }}
                                    >
                                        <option value="">Select a Time</option>
                                        {
                                            Object.keys(dataTemp).length !== 0 &&
                                            dataTemp.data.time.map((el,idx) => {
                                                return <option key={idx} value={idx}>{el}</option>
                                            })
                                        }

                                    </select>
                                </fieldset>

                                <button
                                    className="w-full py-3 bg-[#6F826A] text-white font-semibold rounded-lg hover:bg-[#6F826A] focus:outline-none focus:ring-2 focus:ring-[#6F826A]"
                                    type="submit"
                                >
                                    Get Recommendation Outfit
                                </button>
                                <span className="block text-sm text-gray-500 mt-2">If there are changes please press again (Time in GMT)</span>
                            </form>
                        </>
                        : null
                    }
                </div>

                <div className="p-10">
                    {
                        Object.keys(outfitCurr).length !== 0 && Object.keys(outfitDest).length !== 0 &&
                        <>
                            <div className="space-y-6 mt-6 max-w-2xl mx-auto">
                                {/* Current Location Recommendation */}
                                <div className="bg-white border border-[#BF9264] p-6 rounded-xl shadow-md text-gray-800">
                                    <h2 className="text-xl font-semibold text-[#BF9264] mb-4 border-b border-[#BF9264] pb-2">
                                    📍 Current Location Outfit Recommendation
                                    </h2>
                                    <ul className="space-y-2 text-sm md:text-base">
                                    <li><span className="font-medium">Accessories:</span> {outfitCurr.accessories}</li>
                                    <li><span className="font-medium">Bottom:</span> {outfitCurr.bottom}</li>
                                    <li><span className="font-medium">Footwear:</span> {outfitCurr.footwear}</li>
                                    <li><span className="font-medium">Outerwear:</span> {outfitCurr.outerwear}</li>
                                    <li><span className="font-medium">Top:</span> {outfitCurr.top}</li>
                                    </ul>
                                </div>

                                {/* Destination Location Recommendation */}
                                <div className="bg-white border border-[#6F826A] p-6 rounded-xl shadow-md text-gray-800">
                                    <h2 className="text-xl font-semibold text-[#6F826A] mb-4 border-b border-[#6F826A] pb-2">
                                    ✈️ Destination Outfit Recommendation
                                    </h2>
                                    <ul className="space-y-2 text-sm md:text-base">
                                    <li><span className="font-medium">Accessories:</span> {outfitDest.accessories}</li>
                                    <li><span className="font-medium">Bottom:</span> {outfitDest.bottom}</li>
                                    <li><span className="font-medium">Footwear:</span> {outfitDest.footwear}</li>
                                    <li><span className="font-medium">Outerwear:</span> {outfitDest.outerwear}</li>
                                    <li><span className="font-medium">Top:</span> {outfitDest.top}</li>
                                    </ul>
                                </div>

                                <form onSubmit={async (event) => {
                                    event.preventDefault();
                                    await dispatch(fetchPlanAdd({
                                        "longitudeLocation": currLoc.longitude,
                                        "latitudeLocation": currLoc.latitude,
                                        "displayNameLocation": currLoc.city,
                                        "longitudeDestination": dataLoc.longitude,
                                        "latitudeDestination": dataLoc.latitude,
                                        "displayNameDestination": dataLoc.city,
                                        "recommendationItems" : JSON.stringify({
                                            "dataLocation" : outfitCurr,
                                            "dataDestination" : outfitDest
                                        }),
                                        "timeTemperaturePredicted" : JSON.stringify({
                                            "dataLocation" : {
                                                "time" : selTimeCurr,
                                                "temperature" : selTempCurr
                                            },
                                            "dataDestination" : {
                                                "time" : selTimeDest,
                                                "temperature" : selTempDest
                                            }
                                        }),
                                    })).unwrap()
                                    
                                    navigate('/my-plan')
                                    
                                }}>
                                    <button
                                        className="w-full py-3 bg-[#6F826A] text-white font-semibold rounded-lg hover:bg-[#6F826A] focus:outline-none focus:ring-2 focus:ring-[#6F826A]"
                                        type="submit"
                                    >
                                        Save to My Plan
                                    </button>
                                </form>
                                

                                <span className="block text-sm text-gray-500">If there are changes please press again</span>
                            </div>


                        </>
                    }
                </div>



            </div>

            


        </>
    )
}