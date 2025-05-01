import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Login from "../pages/Login";

export default function MainLayout () {
    if (localStorage.getItem("access_token")) {
        return (
            <>
                <Navbar/>
                <Outlet/>
            </>
        )
    }

    return <Login/>
}