import React from "react";
import { useI18n } from "../context/I18nRouterContext.jsx";

export default function LanguageSwitcher() {
  const { lang, supportedLangs, changeLangPreservePath, t } = useI18n();

  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      {t.language}:
      <select value={lang} onChange={(e) => changeLangPreservePath(e.target.value)}>
        {supportedLangs.map(code => (
          <option key={code} value={code}>
            {code === "es" ? "Español"
              : code === "en" ? "English"
              : code === "fr" ? "Français"
              : code === "ru" ? "Русский"
              : code === "uk" ? "Українська"
              : "Deutsch"}
          </option>
        ))}
      </select>
    </label>
  );
}
