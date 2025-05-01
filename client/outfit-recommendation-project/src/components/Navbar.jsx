import { useNavigate } from "react-router"

export default function Navbar () {
    const navigate = useNavigate()
    return (
        <>
        
        <div className="navbar bg-base-100 shadow-sm bg-color-brown">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li><a onClick={() => {navigate('/')}}>Home</a></li>
                    <li><a onClick={() => {navigate('/my-plan')}}>My Plan</a></li>
                </ul>
                </div>
            </div>
            <div className="navbar-center">
                <a className="btn btn-ghost text-xl">ClimaWear</a>
            </div>
            <div className="navbar-end">
                <ul className="menu menu-horizontal px-1">
                    {/* <li><a>Home</a></li> */}
                    <li>
                        <details>
                        <summary>Profile</summary>
                        <ul className="bg-base-100 rounded-t-none p-2">
                            <li><a onClick={() => {navigate('/login');localStorage.removeItem("access_token")}}>Logout</a></li>
                            {/* <li><a>Link 2</a></li> */}
                        </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </div>
        
        </>
    )
}


