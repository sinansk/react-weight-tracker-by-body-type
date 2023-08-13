import React from 'react'
import { Outlet, } from "react-router-dom";
import Navbar from '../components/CommonComponents/Navbar';
import StickyInfo from '../components/StickyInfo';
const WithNavbar = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default WithNavbar