import { useDispatch, useSelector } from 'react-redux'
import { fetchUserLogin } from '../store/userSlice'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'

export default function Login () {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const {items : data, loading, error} = useSelector(data => data.user)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    async function handleCredentialResponse(response) {
        // console.log("Encoded JWT ID token: " + response.credential);
        const server = await axios({
            method: 'post',
            url: 'https://p2-ip.mfaishaldp.my.id/google-login',
            data: {
              googleToken: response.credential
            }
        });
        

        localStorage.setItem("access_token",server.data.access_token)
        navigate('/')

    }

    const googleFunction = function () {
        google.accounts.id.initialize({
          client_id: "282092061496-hq2n9e1sb8ofdi4coltti2r99s8hkne9.apps.googleusercontent.com",
          callback: handleCredentialResponse
        });
        google.accounts.id.renderButton(
          document.getElementById("buttonDiv"),
          { theme: "outline", size: "large" }  // customization attributes
        );
        google.accounts.id.prompt(); // also display the One Tap dialog
        // navigate('/')
    }

    useEffect(() => {
        googleFunction()
    },[])

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
                <div className="flex justify-center items-center bg-color-green-soft">
                    <img src="regist.svg" alt="" />
                </div>
                <div className="flex justify-center items-center bg-color-green-dark">
                    <form onSubmit={ async (event) => {
                        event.preventDefault()
                        await dispatch(fetchUserLogin({
                            username : username,
                            password : password
                        })).unwrap()
                        navigate('/')
                    }}>
                        <h2 className="text-2xl font-bold mb-4 text-white text-center mt-4">Login</h2>
                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                            
                            <label className="label">Username</label>
                            <input type="username" className="input" placeholder="Username" onChange={(event) => {setUsername(event.target.value)}} />
                            
                            {/* <label className="label">Email</label>
                            <input type="email" className="input" placeholder="Email" onChange={(event) => {setEmail(event.target.value)}}/> */}

                            <label className="label">Password</label>
                            <input type="password" className="input" placeholder="Password" onChange={(event) => {setPassword(event.target.value)}}/>

                            <button className="btn btn-neutral mt-4 bg-color-green-dark" type='submit' >Login</button>
                            <div id="buttonDiv"></div>

                            <p>Don't have an account yet ? <a className="text-primary hover:text-primary-focus transition cursor-pointer" onClick={() => {navigate('/register')}}>Sign up</a> </p>

                        </fieldset>
                    </form>
                </div>
            </div>
        </>
    )
}