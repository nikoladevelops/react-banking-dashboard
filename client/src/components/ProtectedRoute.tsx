import { Navigate } from "react-router";
import { useUserStore } from "../userStore";
import { type ReactNode } from "react";
import Loading from "../pages/Loading";

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const user = useUserStore((state) => state.user);

  // When user is undefined, means it's still loading
  if (user === undefined) {
    return <Loading />;
  }

  // User is null, means not logged in so redirect to login
  if (user === null) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}
