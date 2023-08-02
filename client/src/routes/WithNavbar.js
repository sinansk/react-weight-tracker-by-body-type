import React from 'react'
import { Outlet, } from "react-router-dom";
import Navbar from '../components/CommonComponents/Navbar';
const WithNavbar = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default WithNavbar