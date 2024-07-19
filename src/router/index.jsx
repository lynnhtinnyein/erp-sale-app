import { Routes, Route } from "react-router-dom";
import Middleware from "./Middlewares";
import { v4 as uuid } from 'uuid';

import WelcomePage from "../pages/WelcomePage";
import LeadFormPage from "../pages/LeadFormPage";
import ErrorPage from "../pages/ErrorPage";
import DashboardPagesContainer from "../components/admin/DashboardPagesContainer"

import LoginPage from "../pages/admin/LoginPage";
import LeadsPage from "../pages/admin/LeadsPage";
import OpportunitiesPage from "../pages/admin/OpportunitiesPage";
import SaleOrdersPage from "../pages/admin/SaleOrdersPage";
import DashboardPage from "../pages/admin/DashboardPage";
import PublicPagesContainer from "../components/PublicPagesContainer";
import InventoryPage from "../pages/admin/InventoryPage";

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
            name: 'inventory',
            path: '/admin/inventory',
            title: 'Inventory',
            element: <InventoryPage/>,
            requireAuth: true
        },
        {
            id: uuid(),
            name: 'leads',
            path: '/admin/leads',
            title: 'Leads',
            element: <LeadsPage/>,
            requireAuth: true
        },
        {
            id: uuid(),
            name: 'oportunities',
            path: '/admin/opportunities',
            title: 'Opportunity Management',
            element: <OpportunitiesPage/>,
            requireAuth: true
        },
        {
            id: uuid(),
            name: 'sale_orders',
            path: '/admin/sale_orders',
            title: 'Sale Orders',
            element: <SaleOrdersPage/>,
            requireAuth: true
        }
    ]
}

const RouterOutlet = () => {
    return (
        <Routes>
            { routes.public.map( (route, index) => 
                <Route key={index} path={route.path} element={<PublicPagesContainer>{route.element}</PublicPagesContainer>} />
            )}
            { routes.admin.map( (route, index) =>
                route.requireAuth ? (
                    <Route key={index} element={<Middleware.AuthGuard/>}>
                        <Route path={route.path} element={<DashboardPagesContainer>{route.element}</DashboardPagesContainer>} />
                    </Route>
                ) : (
                    <Route key={index} element={<Middleware.NoAuthOnly/>}>
                        <Route path={route.path} element={route.element} />
                    </Route>
                )
            )}
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
}

const dashboardDrawerRoutes = routes.admin.filter( route => route.requireAuth ).map( e => {
    const { component, ...withoutComponent } = e;
    return withoutComponent;
});

export { RouterOutlet, dashboardDrawerRoutes };