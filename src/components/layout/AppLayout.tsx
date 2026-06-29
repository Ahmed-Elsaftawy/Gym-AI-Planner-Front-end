import { LayoutDashboard, LogOut, UserRound } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { Button } from "../common/Button";
import { LanguageThemeControls } from "./LanguageThemeControls";
import { useAuthStore } from "../../store/authStore";
import { useProfileStore } from "../../store/profileStore";
import { useT } from "../../lib/i18n";

export function AppLayout() {
  const t = useT();
  const logout = useAuthStore((state) => state.logout);
  const clearProfile = useProfileStore((state) => state.clearProfile);
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    clearProfile();
    navigate("/login", { replace: true });
  };

  const navClass = ({ isActive }: { isActive: boolean }) =>
    clsx(
      "inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-semibold transition",
      isActive
        ? "bg-brand-600 text-white"
        : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
    );

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3 font-bold">
            <img
              src="/images/gym-ai-planner.png"
              alt={t("appName")}
              className="h-10 w-10 rounded-lg object-cover ring-1 ring-slate-200 dark:ring-slate-700"
            />
            {t("appName")}
          </div>
          <nav className="flex items-center gap-2">
            <NavLink to="/dashboard" className={navClass}>
              <LayoutDashboard className="h-4 w-4" />
              {t("dashboard")}
            </NavLink>
            <NavLink to="/profile" className={navClass}>
              <UserRound className="h-4 w-4" />
              {t("profile")}
            </NavLink>
          </nav>
          <div className="flex items-center gap-2">
            <LanguageThemeControls />
            <Button type="button" variant="secondary" icon={<LogOut className="h-4 w-4" />} onClick={onLogout}>
              {t("logout")}
            </Button>
          </div>
        </div>
      </header>
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6">
        <Outlet />
      </div>
    </main>
  );
}
