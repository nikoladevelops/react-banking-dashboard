import { Navigate } from "react-router";
import { useUserStore } from "../../userStore";
import { type ReactNode } from "react";
import Loading from "../../pages/Loading";
import NotFound from "../../pages/NotFound";

interface AdminRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export default function AdminOnlyRoute({
  children,
  redirectTo = "/login",
}: AdminRouteProps) {
  const user = useUserStore((state) => state.user);

  // When user is undefined, means it's still loading
  if (user === undefined) {
    return <Loading />;
  }

  // User is null, means not logged in so redirect to login
  if (user === null) {
    return <Navigate to={redirectTo} replace />;
  }

  // User is not an admin, deny access and display NotFound to not expose that the route exists
  if (user.role !== "admin") {
    return <NotFound />;
  }

  return <>{children}</>;
}
