import React from "react";
import { MdExitToApp } from "react-icons/md";
import { useDispatch } from "react-redux";
import { logOut } from "../../firebase";
import { logout as logoutHandle } from "../../redux/userRedux";
const LogoutButton = ({ onClick }) => {
    const dispatch = useDispatch()
    const handleLogout = async () => {
        await logOut();
        dispatch(logoutHandle());
    };

    return (
        <button type="button" onClick={handleLogout} className="flex items-center gap-2 text-gray-200 hover:text-white">
            <MdExitToApp size={24} />
        </button>

    );
};

export default LogoutButton;