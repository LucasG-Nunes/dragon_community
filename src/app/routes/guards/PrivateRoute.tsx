import type { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useIsAuthenticated } from "../../../presentation/hooks/useAuth/useAuth";

interface PrivateRouteProps {
  children: JSX.Element;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isAuthenticated = useIsAuthenticated();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};
