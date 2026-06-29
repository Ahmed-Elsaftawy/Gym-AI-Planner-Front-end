import { Activity, CalendarDays, CircleGauge } from "lucide-react";
import type { PlanJson } from "../../types/api";
import { useT } from "../../lib/i18n";

export function PlanView({ plan }: { plan: PlanJson }) {
  const t = useT();
  const overview = plan.overview;
  const schedule = plan.weeklySchedule ?? [];

  return (
    <div className="space-y-5">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-100">
            <Activity className="h-5 w-5" />
          </span>
          <h2 className="text-xl font-bold">{t("overview")}</h2>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <Info label={t("goal")} value={overview?.goal} />
          <Info label={t("daysPerWeek")} value={overview?.frequency} />
          <Info label={t("preferredSplit")} value={overview?.split} />
        </div>
        {overview?.notes ? <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{overview.notes}</p> : null}
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {schedule.map((day) => (
          <article key={`${day.day}-${day.focus}`} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-brand-600 dark:text-brand-100">{day.day}</p>
                <h3 className="mt-1 text-lg font-bold">{day.focus}</h3>
              </div>
              <CalendarDays className="h-5 w-5 text-slate-400" />
            </div>
            <div className="mt-4 space-y-3">
              {day.exercises?.map((exercise) => (
                <div key={`${day.day}-${exercise.name}`} className="rounded-lg border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h4 className="font-semibold">{exercise.name}</h4>
                      {exercise.notes ? <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{exercise.notes}</p> : null}
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-1 text-xs font-bold text-slate-700 dark:bg-slate-900 dark:text-slate-200">
                      <CircleGauge className="h-3.5 w-3.5" />
                      RPE {exercise.rpe}
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                    <Metric label="Sets" value={exercise.sets} />
                    <Metric label="Reps" value={exercise.reps} />
                    <Metric label="Rest" value={exercise.rest} />
                  </div>
                  {exercise.alternatives?.length ? (
                    <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-semibold">{t("alternatives")}:</span> {exercise.alternatives.join(", ")}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>

      {plan.progression ? (
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-bold">{t("progression")}</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{plan.progression}</p>
        </section>
      ) : null}
    </div>
  );
}

function Info({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-950">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-1 font-semibold">{value || "-"}</p>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg bg-white p-2 text-center dark:bg-slate-900">
      <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}
