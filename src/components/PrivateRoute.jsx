import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, role }) => {
  let user = useSelector(sta => sta.user?.currentUser)
  return user && user.role == role ? children : <Navigate to="/login" />;
};
export default PrivateRoute;
