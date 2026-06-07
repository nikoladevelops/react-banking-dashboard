import { Navigate } from "react-router";
import { useUserStore } from "../../userStore";
import { type ReactNode } from "react";
import Loading from "../../pages/Loading";

interface GuestOnlyRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export default function GuestOnlyRoute({
  children,
  redirectTo = "/profile",
}: GuestOnlyRouteProps) {
  const user = useUserStore((state) => state.user);

  // Still loading
  if (user === undefined) {
    return <Loading />;
  }

  // If logged in, redirect away from guest-only page
  if (user !== null) {
    return <Navigate to={redirectTo} replace />;
  }

  // Not logged in - show guest-only content
  return <>{children}</>;
}
