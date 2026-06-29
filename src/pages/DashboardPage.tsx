import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Sparkles } from "lucide-react";
import { Button } from "../components/common/Button";
import { PlanSkeleton } from "../components/plan/PlanSkeleton";
import { PlanView } from "../components/plan/PlanView";
import { generatePlan, getPlan } from "../services/api/plan";
import { parsePlan } from "../utils/plan";
import { useT } from "../lib/i18n";

export function DashboardPage() {
  const t = useT();
  const queryClient = useQueryClient();
  const planQuery = useQuery({
    queryKey: ["plan"],
    queryFn: getPlan,
    retry: false,
  });

  const plan = parsePlan(planQuery.data);

  const generateMutation = useMutation({
    mutationFn: generatePlan,
    onSuccess: () => {
      toast.success(t("generatedPlan"));
      queryClient.invalidateQueries({ queryKey: ["plan"] });
    },
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t("planTitle")}</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {planQuery.isLoading ? t("loadingPlan") : plan ? t("overview") : t("noPlan")}
          </p>
        </div>
        <Button
          type="button"
          icon={<Sparkles className="h-4 w-4" />}
          isLoading={generateMutation.isPending}
          onClick={() => generateMutation.mutate()}
        >
          {plan ? t("regeneratePlan") : t("generatePlan")}
        </Button>
      </div>

      {planQuery.isLoading ? <PlanSkeleton /> : null}

      {!planQuery.isLoading && plan ? <PlanView plan={plan} /> : null}

      {!planQuery.isLoading && !plan ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <Sparkles className="mx-auto h-8 w-8 text-brand-600" />
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{t("noPlan")}</p>
        </div>
      ) : null}
    </div>
  );
}
