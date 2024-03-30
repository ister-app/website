/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '../store'
import router from '../router'
import VueFullscreen from 'vue-fullscreen'


// Types
import type { App } from 'vue'
import { ApiPlugin } from './api'
import { i18n } from "@/locales";

export function registerPlugins(app: App) {
  app
    .use(i18n)
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(VueFullscreen)
    .use(ApiPlugin)
}
