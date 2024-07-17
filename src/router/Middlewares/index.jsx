import CheckAuth from "./CheckAuth";
import NoAuthOnly from "./NoAuthOnly";
import AuthGuard from "./AuthGuard";

const Middleware = {
    CheckAuth: () => <CheckAuth/>,
    AuthGuard: () => <AuthGuard/>,
    NoAuthOnly: () => <NoAuthOnly/>
};

export default Middleware;