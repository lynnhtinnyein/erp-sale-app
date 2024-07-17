import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AuthGuard = () => {
    const { user } = useSelector( state => state.auth );
    const isAuthenticated = user !== null;

    return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" />;//login page
}

export default AuthGuard;