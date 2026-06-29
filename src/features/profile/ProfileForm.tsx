import { FormEvent, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Save } from "lucide-react";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { Select } from "../../components/common/Select";
import { Skeleton } from "../../components/common/Skeleton";
import { createProfile, getProfile } from "../../services/api/profile";
import type { Profile, ProfilePayload } from "../../types/api";
import { optionLabels, useT } from "../../lib/i18n";
import { useUiStore } from "../../store/uiStore";
import { useProfileStore } from "../../store/profileStore";

export function ProfileForm() {
  const t = useT();
  const navigate = useNavigate();
  const language = useUiStore((state) => state.language);
  const storedProfile = useProfileStore((state) => state.profile);
  const setStoredProfile = useProfileStore((state) => state.setProfile);
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    goal: "",
    experience: "",
    daysPerWeek: "",
    sessionLength: "",
    equipment: "",
    preferredSplit: "",
    injuries: "",
  });

  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    retry: false,
  });

  const savedProfile = profileQuery.data ?? storedProfile;
  const isReadOnly = Boolean(savedProfile);

  const labels = optionLabels[language];
  const options = useMemo(
    () => ({
      goals: ["bulk", "cut", "recomp", "strength", "endurance"].map((value) => ({ value, label: labels[value as keyof typeof labels] })),
      experience: ["begginer", "intermediate", "advanced"].map((value) => ({ value, label: labels[value as keyof typeof labels] })),
      equipment: ["full_gym", "home", "dumbelss"].map((value) => ({ value, label: labels[value as keyof typeof labels] })),
      split: ["full_body", "upper_lower", "ppl", "custom"].map((value) => ({ value, label: labels[value as keyof typeof labels] })),
    }),
    [labels],
  );

  const mutation = useMutation({
    mutationFn: createProfile,
    onSuccess: (profile) => {
      toast.success(t("savedProfile"));
      setStoredProfile(profile);
      queryClient.setQueryData(["profile"], profile);
      queryClient.invalidateQueries({ queryKey: ["plan"] });
      navigate("/dashboard", { replace: true });
    },
  });

  useEffect(() => {
    if (!savedProfile) return;

    setForm(normalizeProfile(savedProfile));
  }, [savedProfile]);

  useEffect(() => {
    if (!profileQuery.data) return;

    setStoredProfile(profileQuery.data);
  }, [profileQuery.data, setStoredProfile]);

  const setField = (key: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.goal || !form.experience || !form.daysPerWeek || !form.sessionLength || !form.equipment || !form.preferredSplit) {
      toast.error("Please complete your training profile first.");
      return;
    }

    const payload: ProfilePayload = {
      goal: form.goal as ProfilePayload["goal"],
      experience: form.experience as ProfilePayload["experience"],
      daysPerWeek: Number(form.daysPerWeek),
      sessionLength: Number(form.sessionLength),
      equipment: form.equipment as ProfilePayload["equipment"],
      preferredSplit: form.preferredSplit as ProfilePayload["preferredSplit"],
      injuries: form.injuries || "none",
    };

    mutation.mutate(payload);
  };

  return (
    <form onSubmit={onSubmit} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <div>
        <h2 className="text-xl font-bold">{t("profileTitle")}</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t("profileSubtitle")}</p>
      </div>

      {profileQuery.isLoading ? (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
        </div>
      ) : null}

      {!profileQuery.isLoading && isReadOnly ? (
        <div className="mt-5 rounded-lg border border-brand-500/20 bg-brand-50 px-4 py-3 text-sm font-medium text-brand-700 dark:bg-brand-500/10 dark:text-brand-100">
          {t("savedProfile")}
        </div>
      ) : null}

      {!profileQuery.isLoading ? (
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Select disabled={isReadOnly} label={t("goal")} value={form.goal} required options={[{ value: "", label: t("select") }, ...options.goals]} onChange={(event) => setField("goal", event.target.value)} />
        <Select disabled={isReadOnly} label={t("experience")} value={form.experience} required options={[{ value: "", label: t("select") }, ...options.experience]} onChange={(event) => setField("experience", event.target.value)} />
        <Input disabled={isReadOnly} label={t("daysPerWeek")} type="number" min={1} max={7} value={form.daysPerWeek} required onChange={(event) => setField("daysPerWeek", event.target.value)} />
        <Input disabled={isReadOnly} label={t("sessionLength")} type="number" min={20} max={180} value={form.sessionLength} required onChange={(event) => setField("sessionLength", event.target.value)} />
        <Select disabled={isReadOnly} label={t("equipment")} value={form.equipment} required options={[{ value: "", label: t("select") }, ...options.equipment]} onChange={(event) => setField("equipment", event.target.value)} />
        <Select disabled={isReadOnly} label={t("preferredSplit")} value={form.preferredSplit} required options={[{ value: "", label: t("select") }, ...options.split]} onChange={(event) => setField("preferredSplit", event.target.value)} />
        <Input
          disabled={isReadOnly}
          label={`${t("injuries")} (${t("optional")})`}
          className="md:col-span-2"
          value={form.injuries}
          onChange={(event) => setField("injuries", event.target.value)}
          placeholder="none"
        />
      </div>
      ) : null}

      {!isReadOnly ? (
      <Button className="mt-6" type="submit" isLoading={mutation.isPending} icon={<Save className="h-4 w-4" />}>
        {t("createProfile")}
      </Button>
      ) : null}
    </form>
  );
}

function normalizeProfile(profile: Profile) {
  return {
    goal: profile.goal ?? "",
    experience: profile.experience ?? "",
    daysPerWeek: String(profile.daysPerWeek ?? profile.daysperweek ?? ""),
    sessionLength: String(profile.sessionLength ?? profile.sessionlength ?? ""),
    equipment: profile.equipment ?? "",
    preferredSplit: profile.preferredSplit ?? profile.preferredsplit ?? "",
    injuries: profile.injuries && profile.injuries !== "none" ? profile.injuries : "",
  };
}
