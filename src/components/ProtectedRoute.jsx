import {Route, Navigate} from 'react-router-dom';

const ProtectedRoute = ({children}) => {  
    const verifyLoggedUsers=()=>{
        if(localStorage.getItem('loggedUser'))
            return JSON.parse(localStorage.getItem('loggedUser'))
        else
        return null
    }  
    return verifyLoggedUsers() ? children : <Navigate to="/" replace />;
}
export default ProtectedRoute;