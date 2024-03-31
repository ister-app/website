/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import {createVuetify} from 'vuetify'
import {useI18n} from "vue-i18n";
import {createVueI18nAdapter} from "vuetify/locale/adapters/vue-i18n";
import {i18n} from "@/locales";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
    locale: {
        adapter: createVueI18nAdapter({i18n, useI18n}),
    },
})
