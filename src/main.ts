/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import {registerPlugins} from '@/plugins'

// Fonts
import 'unfonts.css'

// Components
import App from './App.vue'

// Composables
import {createApp} from 'vue'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
