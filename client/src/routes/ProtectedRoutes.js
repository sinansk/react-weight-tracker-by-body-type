import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux"
import MobileTabsComponent from "../components/MembershipComponents/MobileTabsComponent";
import { useMediaQuery } from "../utils/useMediaQuery";
import LogoutButton from "../components/MembershipComponents/LogoutComponent";

const ProtectedRoutes = () => {
    const { currentUser } = useSelector((state) => state.user)
    const isMobile = useMediaQuery('(max-width: 767px)');
    if (currentUser) {
        return (
            <>
                <Outlet />;
                {isMobile &&
                    <>
                        <MobileTabsComponent />
                    </>
                }
            </>
        )
    } else {
        return <Navigate to="/login" replace={true} />;
    }
};

export default ProtectedRoutes;
