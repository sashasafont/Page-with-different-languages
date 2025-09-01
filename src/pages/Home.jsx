import React from "react";
import { useI18n } from "../context/I18nRouterContext.jsx";

export default function Home() {
  const { t } = useI18n();
  return (
    <section>
      <h2>{t.home.title}</h2>
      <p>{t.home.content}</p>
    </section>
  );
}
