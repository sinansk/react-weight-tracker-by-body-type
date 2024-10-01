import { Navigate, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux"
const AuthRoutes = () => {
    const { currentUser } = useSelector((state) => state.user)
    const location = useLocation()
    const navigate = useNavigate()
    if (!currentUser) {
        return <Outlet />;
    } else {
        if (location.pathname === "/") {
            navigate("/mystats")
        }
        return <Navigate to={`/mystats`} replace={true} />;
    }
};

export default AuthRoutes