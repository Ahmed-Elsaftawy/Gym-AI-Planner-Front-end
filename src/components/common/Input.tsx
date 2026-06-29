import type { InputHTMLAttributes } from "react";
import clsx from "clsx";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
};

export function Input({ label, hint, className, id, ...props }: InputProps) {
  const inputId = id ?? props.name;
  return (
    <label htmlFor={inputId} className="block space-y-2">
      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</span>
      <input
        id={inputId}
        className={clsx(
          "h-12 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100",
          className,
        )}
        {...props}
      />
      {hint ? <span className="text-xs text-slate-500 dark:text-slate-400">{hint}</span> : null}
    </label>
  );
}
