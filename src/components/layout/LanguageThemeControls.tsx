import { Languages, Moon, Sun } from "lucide-react";
import clsx from "clsx";
import { Button } from "../common/Button";
import { useT } from "../../lib/i18n";
import { useUiStore } from "../../store/uiStore";

export function LanguageThemeControls({ compact = false }: { compact?: boolean }) {
  const t = useT();
  const { theme, toggleLanguage, toggleTheme } = useUiStore();

  return (
    <div className={clsx("flex items-center gap-2", compact && "scale-95")}>
      <Button type="button" variant="ghost" icon={<Languages className="h-4 w-4" />} onClick={toggleLanguage}>
        {compact ? null : t("switchLanguage")}
      </Button>
      <Button
        type="button"
        variant="ghost"
        aria-label={t("switchTheme")}
        icon={theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        onClick={toggleTheme}
      />
    </div>
  );
}
