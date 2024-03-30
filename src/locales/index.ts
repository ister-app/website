import localeEN from "./en.json";
import localeNL from "./nl.json";
import {createI18n} from "vue-i18n";
import {en, nl} from "vuetify/locale";

const messages = {
    en: {
        $vuetify: {
            ...en,
        },
        ...localeEN
    },
    nl: {
        $vuetify: {
            ...nl,
        },
        ...localeNL
    },
}

export const supportLocales = ['en', 'nl']

export const i18n = createI18n({
    legacy: false,
    locale: 'en', // set locale
    fallbackLocale: 'en', // set fallback locale
    messages, // set locale messages
})
