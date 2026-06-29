import { Skeleton } from "../common/Skeleton";

export function PlanSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-28 w-full" />
      <div className="grid gap-4 md:grid-cols-2">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  );
}
