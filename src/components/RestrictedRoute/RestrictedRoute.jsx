import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/auth/selector";
import PropTypes from "prop-types";

const RestrictedRoute = ({ component: Component, redirectTo = "/" }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};

RestrictedRoute.propTypes = {
  component: PropTypes.node.isRequired,
  redirectTo: PropTypes.string,
};

export default RestrictedRoute;
