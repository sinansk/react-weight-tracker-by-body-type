import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux"
const ProtectedRoutes = () => {
    const { currentUser } = useSelector((state) => state.user)

    if (currentUser) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" replace={true} />;
    }
};

export default ProtectedRoutes;
