import { Routes, Route } from "react-router-dom";
import Middleware from "./Middlewares";
import { v4 as uuid } from 'uuid';
import DashboardRoot from "../components/admin/DashboardRoot";

//public pages
import WelcomePage from "../pages/WelcomePage";
import LeadFormPage from "../pages/LeadFormPage";
import ErrorPage from "../pages/ErrorPage";

//admin pages 
import LoginPage from "../pages/admin/LoginPage";
import OpportunityManagementPage from "../pages/admin/OpportunityManagementPage";
import DashboardPage from "../pages/admin/DashboardPage";

//routes registry
const routes = {
    public: [
        {
            id: uuid(),
            name: 'welcome',
            path: '/',
            title: 'Welcome',
            element: <WelcomePage/>,
        },
        {
            id: uuid(),
            name: 'lead_form',
            path: '/lead_form',
            title: 'Lead Form',
            element: <LeadFormPage/>,
        }
    ],
    admin: [
        {
            id: uuid(),
            name: 'login',
            path: '/admin/login',
            title: 'Login',
            element: <LoginPage/>,
            requireAuth: false
        },
        {
            id: uuid(),
            name: 'dashboard',
            path: '/admin/dashboard',
            title: 'Dashboard',
            element: <DashboardPage/>,
            requireAuth: true
        },
        {
            id: uuid(),
            name: 'Opportunity Management',
            path: '/admin/opportunity_management',
            title: 'Opportunity Management',
            element: <OpportunityManagementPage/>,
            requireAuth: true
        }
    ]
}

const adminRoutesWithoutComponent = routes.admin.map( e => {
    const { component, ...withoutComponent } = e;
    return withoutComponent;
});

const RouterOutlet = () => {
    return (
        <Routes>
            { routes.public.map( (route, index) => 
                <Route key={index} path={route.path} element={route.element} />
            )}
            <Route element={<Middleware.CheckAuth/>}>
                { routes.admin.map( (route, index) =>
                    route.requireAuth ? (
                        <Route key={index} element={<Middleware.AuthGuard/>}>
                            <Route path={route.path} element={<DashboardRoot>{route.element}</DashboardRoot>} />
                        </Route>
                    ) : (
                        <Route key={index} element={<Middleware.NoAuthOnly/>}>
                            <Route path={route.path} element={route.element} />
                        </Route>
                    )
                )}
            </Route>

            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
}

export { RouterOutlet, adminRoutesWithoutComponent };