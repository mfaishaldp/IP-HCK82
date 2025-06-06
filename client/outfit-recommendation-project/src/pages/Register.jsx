import { useDispatch, useSelector } from 'react-redux'
import { fetchUserRegister } from '../store/userSlice'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'


export default function Register () {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const {items : data, loading, error} = useSelector(data => data.user)

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
                <div className="flex justify-center items-center bg-color-green-soft">
                    <img src="regist.svg" alt="" />
                </div>
                <div className="flex justify-center items-center bg-color-green-dark">
                    <form onSubmit={ async (event) => {
                        event.preventDefault()
                        await dispatch(fetchUserRegister({
                            username : username,
                            email : email,
                            password : password
                        })).unwrap() //! perlu di unwrap karena ada fungsi async dan perlu di await
                        navigate('/login')
                    }}>
                        <h2 className="text-2xl font-bold mb-4 text-white text-center mt-4">Sign Up</h2>
                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                            
                            <label className="label">Username</label>
                            <input type="username" className="input" placeholder="Username" onChange={(event) => {setUsername(event.target.value)}} />
                            
                            <label className="label">Email</label>
                            <input type="email" className="input" placeholder="Email" onChange={(event) => {setEmail(event.target.value)}}/>

                            <label className="label">Password</label>
                            <input type="password" className="input" placeholder="Password" onChange={(event) => {setPassword(event.target.value)}}/>

                            <button className="btn btn-neutral mt-4 bg-color-green-dark" type='submit' >Sign Up</button>

                            <p>Do you have an account? <a className="text-primary hover:text-primary-focus transition cursor-pointer" onClick={() => {navigate('/login')}}>login</a> </p>

                        </fieldset>
                    </form>
                </div>
            </div>
        </>
    )
}