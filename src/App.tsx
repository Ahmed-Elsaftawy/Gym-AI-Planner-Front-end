import { useEffect } from "react";
import { AppRoutes } from "./routes/AppRoutes";
import { useUiStore } from "./store/uiStore";

export default function App() {
  const { language, theme } = useUiStore();

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [language, theme]);

  return <AppRoutes />;
}
