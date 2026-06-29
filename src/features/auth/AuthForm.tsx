import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ArrowRight, LogIn, UserPlus } from "lucide-react";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { loginUser, registerUser } from "../../services/api/auth";
import { useAuthStore } from "../../store/authStore";
import { useT } from "../../lib/i18n";

type AuthFormProps = {
  mode: "login" | "register";
};

export function AuthForm({ mode }: AuthFormProps) {
  const t = useT();
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const isLogin = mode === "login";

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (token) => {
      setToken(token);
      navigate("/profile", { replace: true });
    },
  });

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: async () => {
      toast.success("Account created");
      const token = await loginUser({ email: form.email, password: form.password });
      setToken(token);
      navigate("/profile", { replace: true });
    },
  });

  const isPending = loginMutation.isPending || registerMutation.isPending;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLogin) {
      loginMutation.mutate({ email: form.email, password: form.password });
      return;
    }

    registerMutation.mutate({
      username: form.username,
      email: form.email,
      password: form.password,
    });
  };

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900 sm:p-8">
      <div>
        <h2 className="text-2xl font-bold">{isLogin ? t("login") : t("register")}</h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {isLogin ? t("loginSubtitle") : t("registerSubtitle")}
        </p>
      </div>

      <div className="mt-6 space-y-4">
        {!isLogin ? (
          <Input
            label={t("username")}
            name="username"
            minLength={3}
            maxLength={20}
            value={form.username}
            onChange={(event) => setForm((current) => ({ ...current, username: event.target.value }))}
            required
          />
        ) : null}
        <Input
          label={t("email")}
          name="email"
          type="email"
          value={form.email}
          onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          required
        />
        <Input
          label={t("password")}
          name="password"
          type="password"
          minLength={8}
          value={form.password}
          onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
          required
        />
      </div>

      <Button
        type="submit"
        className="mt-6 w-full"
        isLoading={isPending}
        icon={isLogin ? <LogIn className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
      >
        {isLogin ? t("login") : t("register")}
      </Button>

      <p className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        {isLogin ? t("noAccount") : t("haveAccount")}
        <Link className="inline-flex items-center gap-1 font-semibold text-brand-600 hover:text-brand-700" to={isLogin ? "/register" : "/login"}>
          {isLogin ? t("register") : t("login")}
          <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
        </Link>
      </p>
    </form>
  );
}
