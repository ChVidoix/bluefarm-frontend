import { Navigate } from "react-router-dom";
import { Auth } from "../../reducer/BlueFarmReducer.const";

interface PrivateRouteProps {
  element: JSX.Element;
  isLoading: boolean;
  auth: Auth;
}

const PrivateRoute = ({ element, isLoading, auth }: PrivateRouteProps) => {
  if (isLoading) {
    return <h2>Loading...</h2>;
  } else if (!auth.isAuthenticated) {
    return <Navigate to={"/login"} />;
  } else {
    return element;
  }
};

export default PrivateRoute;
