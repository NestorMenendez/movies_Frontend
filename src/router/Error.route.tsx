import { Navigate } from "react-router-dom"


const ErrorRoute = () => {

    window.alert('The indicated route is not disponible.');
    return <Navigate to={'/home'}></Navigate>

};

export default ErrorRoute;