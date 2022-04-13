import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import  useAuth from '../hooks/userAuth';

const AuthRequired = () => {    
        const auth = useAuth();
        const location = useLocation();
        return (
          auth?.token ? 
                <Outlet/>
                :<Navigate to="/login" state={{from:location}} replace></Navigate>
        // <Outlet/>
      )
    }

export default AuthRequired