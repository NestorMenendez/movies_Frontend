import { Navigate, Outlet } from "react-router-dom"
import { useAuth0 } from '@auth0/auth0-react'


const PrivateRoute = () => {

    const { isAuthenticated } = useAuth0();

    if (!isAuthenticated) {
        window.alert('User has to be logged to navigate to the profile area.');
        return <Navigate to={'/home'}></Navigate>
    };

    return <Outlet />
};

export default PrivateRoute;