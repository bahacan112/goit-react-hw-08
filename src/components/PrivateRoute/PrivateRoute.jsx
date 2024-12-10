import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  selectIsLoggedIn,
  selectIsRefreshing,
} from "../../redux/auth/selector";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, redirectTo = "/" }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const shouldRedirect = !isLoggedIn && !isRefreshing;
  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};
PrivateRoute.propTypes = {
  component: PropTypes.node.isRequired,
  redirectTo: PropTypes.string,
};

export default PrivateRoute;
