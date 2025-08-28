import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const loginState = localStorage.getItem("jwt");

  return loginState ? (
    children
  ) : (
    <Navigate
      to="/login"
      state={{ message: "Please login to continue" }}
      replace
    />
  );
};

export default PrivateRoute;
