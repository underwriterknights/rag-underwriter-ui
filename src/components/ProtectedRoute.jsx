import {Route, Navigate} from 'react-router-dom';

const ProtectedRoute = ({children, isLoggedIn}) => {    
    return isLoggedIn ? children : <Navigate to="/" replace />;
}
export default ProtectedRoute;