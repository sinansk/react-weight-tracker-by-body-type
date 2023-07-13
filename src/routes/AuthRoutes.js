import { Navigate, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux"
const AuthRoutes = () => {
    const { currentUser } = useSelector((state) => state.user)
    const location = useLocation()
    const navigate = useNavigate()
    const params = useParams()
    console.log("location", location)
    if (!currentUser) {
        return <Outlet />;
    } else {
        return <Navigate to="/" replace={true} />;
    }
};

export default AuthRoutes