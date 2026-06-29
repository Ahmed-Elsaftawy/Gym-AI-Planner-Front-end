import { Navigate, Outlet, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/authStore";
import { useT } from "../lib/i18n";

export function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();
  const t = useT();
  const warnedRef = useRef(false);

  useEffect(() => {
    if (!isAuthenticated && !warnedRef.current) {
      warnedRef.current = true;
      toast.error(t("routeGuard"));
    }
  }, [isAuthenticated, t]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
