import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const NoAuthOnly = () => {
    const { user } = useSelector( state => state.auth );
    const isAuthenticated = user !== null;

    return isAuthenticated ? <Navigate to="/admin/dashboard"/> : <Outlet />;//login page
};

export default NoAuthOnly;
