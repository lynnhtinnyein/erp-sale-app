import NoAuthOnly from "./NoAuthOnly";
import AuthGuard from "./AuthGuard";

const Middleware = {
    AuthGuard: () => <AuthGuard/>,
    NoAuthOnly: () => <NoAuthOnly/>
};

export default Middleware;