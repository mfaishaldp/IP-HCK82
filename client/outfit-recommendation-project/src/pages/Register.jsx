import { useDispatch, useSelector } from 'react-redux'
import { fetchUserRegister } from '../store/userSlice'
import { useEffect } from 'react'
import { Link } from "react-router-dom";


export default function Register () {

    const dispatch = useDispatch()
    const {items : data, loading, error} = useSelector(data => data.user)
  
    // useEffect(() => {
    //   dispatch(fetchUserRegister({
    //     "username" : "",
    //     "email" : "user7@gmail.com",
    //     "password" : "1234567"
    // }))
    // },[])


    return (
        <>
            {/* <div className="grid grid-cols-2 h-screen"> */}
            <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
                <div className="flex justify-center items-center bg-color-green-soft">
                    <img src="regist.svg" alt="" />
                </div>
                <div className="flex justify-center items-center bg-color-green-dark">
                    <form action="">
                        <h2 className="text-2xl font-bold mb-4 text-white text-center mt-4">Sign Up</h2>
                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                            
                            <label className="label">Username</label>
                            <input type="username" className="input" placeholder="Username" onChange={() => {}} />
                            
                            <label className="label">Email</label>
                            <input type="email" className="input" placeholder="Email" onChange={() => {}}/>

                            <label className="label">Password</label>
                            <input type="password" className="input" placeholder="Password" onChange={() => {}}/>

                            <button className="btn btn-neutral mt-4 bg-color-green-dark" type='submit' >Sign Up</button>

                            <p>Do you have an account? <button className="text-primary underline hover:text-primary-focus transition cursor-pointer" onClick={() => {}}>login</button> </p>

                        </fieldset>
                    </form>
                </div>
            </div>
        </>
    )
}