import React from "react";
import { useI18n } from "../context/I18nRouterContext.jsx";
export default function Contact() {
    const { t } = useI18n();

    return(
        <div>
            <h1>{t.nav.title}</h1>
            <p>{t.contactContent}</p>
        </div>
    );
}