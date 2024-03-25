import React from "react";
import { NavLink } from "react-router-dom";
import { MdEqualizer, MdTrendingUp, MdSettings } from "react-icons/md";
import LogoutButton from "./LogoutComponent";

const MobileTabsComponent = () => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around py-2 text-white bg-gray-900">
            <NavLink to="/mystats" className="flex flex-col items-center justify-center text-center">
                <MdEqualizer size={24} />
                <span className="text-xs">My Stats</span>
            </NavLink>
            <NavLink to="/calorie-tracker" className="flex flex-col items-center justify-center text-center">
                <MdTrendingUp size={24} />
                <span className="text-xs">Calorie Tracker</span>
            </NavLink>
            <NavLink to="/settings" className="flex flex-col items-center justify-center text-center">
                <MdSettings size={24} />
                <span className="text-xs">Settings</span>
            </NavLink>
            <NavLink to="/" className="flex flex-col items-center justify-center text-center">
                <LogoutButton />
                <span className="text-xs">Logout</span>
            </NavLink>
        </nav>
    );
};

export default MobileTabsComponent;
