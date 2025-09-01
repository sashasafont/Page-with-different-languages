import React, { createContext, useContext, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import translations from "../i18n/translations.json";

const I18nRouterContext = createContext(null);
export const useI18n = () => useContext(I18nRouterContext);

const supportedLangs = ["es", "en", "fr", "ru", "uk", "de"];
const DEFAULT_LANG = "en";

function detectBrowserLang() {
  const b = navigator.language?.slice(0, 2) || DEFAULT_LANG;
  return supportedLangs.includes(b) ? b : DEFAULT_LANG;
}

function normalizeLang(lang) {
  if (!lang) return DEFAULT_LANG;
  return supportedLangs.includes(lang) ? lang : DEFAULT_LANG;
}

export function I18nRouterProvider({ children }) {
  const params = useParams();     // { lang?: "es" | "en" ... }
  const navigate = useNavigate();
  const location = useLocation();

  // 1) Determinar idioma: URL > localStorage > navegador > default
  const urlLang = normalizeLang(params.lang);
  const stored = localStorage.getItem("lang");
  const initialLang = urlLang || stored || detectBrowserLang();

  // si la URL no tiene lang, redirige a /<initialLang><path>
  React.useEffect(() => {
    if (!params.lang) {
      const path = location.pathname.replace(/^\//, "");
      const withLang = `/${initialLang}/${path}`;
      navigate(withLang === `/${initialLang}/` ? `/${initialLang}` : withLang, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.lang]);

  // Guardar en localStorage cuando cambie el lang de URL
  React.useEffect(() => {
    if (urlLang) localStorage.setItem("lang", urlLang);
  }, [urlLang]);

  const t = translations[urlLang || DEFAULT_LANG];

  // Construir paths con idioma
  const buildPath = React.useCallback((lang, ...segments) => {
    const safeLang = normalizeLang(lang);
    const cleaned = segments
      .filter(Boolean)
      .map(s => String(s).replace(/^\/+|\/+$/g, "")); // trim slashes
    return `/${safeLang}${cleaned.length ? "/" + cleaned.join("/") : ""}`;
  }, []);

  // Cambiar idioma preservando ruta actual (sustituye el primer segmento)
  const changeLangPreservePath = React.useCallback((newLang) => {
    const safeLang = normalizeLang(newLang);
    const parts = location.pathname.split("/").filter(Boolean);
    // parts[0] es el lang actual (si existe)
    if (parts.length === 0) {
      navigate(`/${safeLang}`, { replace: false });
      return;
    }
    if (supportedLangs.includes(parts[0])) {
      parts[0] = safeLang;
    } else {
      parts.unshift(safeLang);
    }
    navigate("/" + parts.join("/"), { replace: false });
  }, [location.pathname, navigate]);

  const value = useMemo(() => ({
    lang: urlLang || DEFAULT_LANG,
    t,
    supportedLangs,
    changeLangPreservePath,
    buildPath
  }), [urlLang, t, changeLangPreservePath, buildPath]);

  return (
    <I18nRouterContext.Provider value={value}>
      {children}
    </I18nRouterContext.Provider>
  );
}
