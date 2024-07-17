import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import CheckAuthPage from "../../pages/CheckAuthPage";

const CheckAuth = () => {
    const { isAuthChecked } = useSelector( state => state.auth );
    return !isAuthChecked ? <CheckAuthPage/> : <Outlet/>;
}

export default CheckAuth;