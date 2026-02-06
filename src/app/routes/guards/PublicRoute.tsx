import type { JSX } from "react";
import { Navigate } from "react-router-dom";

import { useIsAuthenticated } from "../../../presentation/hooks/useAuth/useAuth";
import { DEFAULT_AUTHENTICATED_ROUTE } from "../../../shared/constants/auth.constants";

interface PublicRouteProps {
  children: JSX.Element;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated) {
    return <Navigate to={DEFAULT_AUTHENTICATED_ROUTE} replace />;
  }

  return children;
};
