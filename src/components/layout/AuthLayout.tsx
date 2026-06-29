import { Link, Outlet } from "react-router-dom";
import { LanguageThemeControls } from "./LanguageThemeControls";
import { useT } from "../../lib/i18n";

export function AuthLayout() {
  const t = useT();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto grid min-h-screen w-full max-w-6xl grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="relative flex min-h-[320px] flex-col justify-between overflow-hidden bg-slate-900 p-6 text-white dark:bg-black sm:p-8 lg:min-h-screen">
          <img
            src="/images/gym-ai-planner.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-slate-950/65" />
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="relative z-10 flex items-center gap-3 font-bold">
              <img
                src="/images/gym-ai-planner.png"
                alt={t("appName")}
                className="h-11 w-11 rounded-lg object-cover ring-1 ring-white/20"
              />
              {t("appName")}
            </Link>
            <div className="relative z-10">
              <LanguageThemeControls compact />
            </div>
          </div>
          <div className="relative z-10 max-w-xl py-10 lg:py-0">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-100">AI Coaching</p>
            <h1 className="mt-5 text-3xl font-bold leading-tight sm:text-5xl">{t("welcome")}</h1>
          </div>
          <div className="relative z-10 hidden h-24 rounded-lg border border-white/10 bg-white/5 backdrop-blur lg:block" />
        </section>
        <section className="flex items-center justify-center p-6 sm:p-8">
          <Outlet />
        </section>
      </div>
    </main>
  );
}
