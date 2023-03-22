import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
        const user = localStorage.getItem('user');
        const location = useLocation();

        if (!user) {
                return <Navigate to="/" state={{ from: location }} replace />;
        }
        return children;
};

export default PrivateRoute;