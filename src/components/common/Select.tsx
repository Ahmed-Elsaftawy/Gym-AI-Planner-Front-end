import type { SelectHTMLAttributes } from "react";
import clsx from "clsx";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: { value: string | number; label: string }[];
};

export function Select({ label, options, className, id, ...props }: SelectProps) {
  const selectId = id ?? props.name;
  return (
    <label htmlFor={selectId} className="block space-y-2">
      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</span>
      <select
        id={selectId}
        className={clsx(
          "h-12 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100",
          className,
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
