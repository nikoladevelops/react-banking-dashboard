import { Navigate } from "react-router";
import { useUserStore } from "../userStore";
import { type ReactNode } from "react";

interface GuestRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export default function GuestRoute({
  children,
  redirectTo = "/profile",
}: GuestRouteProps) {
  const user = useUserStore((state) => state.user);

  // Still loading
  if (user === undefined) {
    return <div>Loading...</div>;
  }

  // If logged in, redirect away from guest-only page
  if (user !== null) {
    return <Navigate to={redirectTo} replace />;
  }

  // Not logged in - show guest-only content
  return <>{children}</>;
}
