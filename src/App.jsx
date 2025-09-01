import React from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "./context/ThemeContext.jsx";
import { useI18n } from "./context/I18nRouterContext.jsx";
import LanguageSwitcher from "./components/LanguageSwitcher.jsx";
import Nav from "./components/Nav.jsx";

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useI18n();

  return (
    <div style={{ padding: 24 }}>
      <header style={{ display: "flex", gap: 16, alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <strong>{t.greeting}</strong>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <LanguageSwitcher />
          <button onClick={toggleTheme}>
            {theme === "light" ? t.themeDark : t.themeLight}
          </button>
        </div>
      </header>

      <hr style={{ margin: "16px 0" }} />

      <Nav />
      <Outlet />
    </div>
  );
}
