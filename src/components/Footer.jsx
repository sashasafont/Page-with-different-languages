import React from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../context/I18nRouterContext.jsx"; // Ajusta ruta si es necesario

export default function Footer() {
  const { lang, t, buildPath } = useI18n();

  return (
    <footer style={{ padding: 20, borderTop: "1px solid #ccc", marginTop: 40 }}>
      <nav>
        <Link to={buildPath(lang, "contact")}>{t.nav.contact}</Link>
      </nav>
      <p style={{ marginTop: 16, fontSize: 14 }}>
        &copy; {new Date().getFullYear()} <br></br>Hecho con amor en BCN
      </p>
    </footer>
  );
}