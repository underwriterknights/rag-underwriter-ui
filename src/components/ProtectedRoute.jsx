import {Route, Navigate} from 'react-router-dom';

const ProtectedRoute = ({children, loggedUser}) => {    
    return loggedUser ? children : <Navigate to="/" replace />;
}
export default ProtectedRoute;