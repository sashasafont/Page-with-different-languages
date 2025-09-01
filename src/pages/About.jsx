import React from "react";
import { useI18n } from "../context/I18nRouterContext.jsx";

export default function About() {
  const { t } = useI18n();
  return (
    <section>
      <h2>{t.about.title}</h2>
      <p>{t.about.content}</p>
    </section>
  );
}
