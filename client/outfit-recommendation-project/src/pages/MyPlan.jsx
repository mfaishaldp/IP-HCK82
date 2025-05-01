import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPlanGetPlanByUserId,fetchPlanDelPlanById } from "../store/planSlice"

export default function MyPlan () {

    const {itemsPlanByUserId} = useSelector(data => data.plan)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(fetchPlanGetPlanByUserId())
    },[])

    return (
        <>

            {console.log(itemsPlanByUserId)}

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4">
                {itemsPlanByUserId.map((el, idx) => {
                    const data = JSON.parse(el.recommendationItems);
                    const dataTemp = JSON.parse(el.timeTemperaturePredicted);
                    return (
                    <div
                        key={idx}
                        className="bg-white border border-gray-200 rounded-lg shadow-md p-6 flex flex-col gap-4"
                    >
                        <div className="text-sm text-gray-500">Plan #{idx + 1}</div>

                        <div>
                        <h3 className="font-semibold text-lg text-gray-800">Current Location</h3>
                        <p className="text-gray-600">{el.displayNameLocation} - {dataTemp.dataLocation.time} (GMT) - {dataTemp.dataLocation.temperature}°C</p>
                        </div>

                        <div>
                        <h4 className="font-semibold text-gray-800">Recommendation Outfit</h4>
                        <ul className="mt-2 space-y-1 text-sm text-gray-700">
                            <li><span className="font-medium">Top:</span> {data.dataLocation.top}</li>
                            <li><span className="font-medium">Bottom:</span> {data.dataLocation.bottom}</li>
                            <li><span className="font-medium">Outerwear:</span> {data.dataLocation.Outerwear}</li>
                            <li><span className="font-medium">Footwear:</span> {data.dataLocation.footwear}</li>
                            <li><span className="font-medium">Accessories:</span> {data.dataLocation.accessories}</li>
                        </ul>
                        </div>

                        <div>
                        <h3 className="font-semibold text-gray-800">Destination</h3>
                        <p className="text-gray-600">{el.displayNameDestination} - {dataTemp.dataDestination.time} (GMT) - {dataTemp.dataDestination.temperature}°C</p>
                        </div>

                        <div>
                        <h4 className="font-semibold text-gray-800">Recommendation Outfit</h4>
                        <ul className="mt-2 space-y-1 text-sm text-gray-700">
                            <li><span className="font-medium">Top:</span> {data.dataDestination.top}</li>
                            <li><span className="font-medium">Bottom:</span> {data.dataDestination.bottom}</li>
                            <li><span className="font-medium">Outerwear:</span> {data.dataDestination.Outerwear}</li>
                            <li><span className="font-medium">Footwear:</span> {data.dataDestination.footwear}</li>
                            <li><span className="font-medium">Accessories:</span> {data.dataDestination.accessories}</li>
                        </ul>
                        </div>

                        <div className="mt-auto text-sm font-semibold text-[#BF9264]">
                        Status: {el.Status.statusName}
                        </div>

                        <button
                            className="w-full py-3 bg-[#BF9264] text-white font-semibold rounded-lg hover:bg-[#9F7C57] focus:outline-none focus:ring-2 focus:ring-[#BF9264]"
                            type="button"
                            onClick={async () => {
                                await dispatch(fetchPlanDelPlanById({
                                    id : el.id
                                })).unwrap()
                                await dispatch(fetchPlanGetPlanByUserId()).unwrap()
                            }}
                        >
                            Delete
                        </button>

                    </div>
                    );
                })}
            </div>

        
        </>
    )
}