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
import {ApiPlugin} from './api'
import {i18n} from "@/locales";
import urql, { Client, cacheExchange, fetchExchange } from '@urql/vue';

// Types
import type {App} from 'vue'
import {AuthConfig, authExchange} from "@urql/exchange-auth";

function initializeAuthState() {
    const tokenJson = sessionStorage.getItem('oidc.user:https://keycloak.droogers.cloud/realms/Thuis:ister');
    const token = tokenJson ? JSON.parse(tokenJson).access_token : undefined;
    // const refreshToken = localStorage.getItem('refreshToken');
    console.log(token);
    return { token };
}

export function registerPlugins(app: App) {
    app
        .use(i18n)
        .use(vuetify)
        .use(router)
        .use(pinia)
        .use(VueFullscreen)
        .use(ApiPlugin)
        .use(urql, new Client({
            url: import.meta.env.VITE_BACKEND_URL + '/graphql',
            exchanges: [cacheExchange,
                authExchange(async utilities => {
                    const result: AuthConfig =  ({
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        didAuthError(error, _operation) {
                            return false;
                        },
                        async refreshAuth() {
                            return undefined;
                        },
                        addAuthToOperation(operation) {
                            const { token } = initializeAuthState();
                            if (!token) return operation;
                            return utilities.appendHeaders(operation, {
                                Authorization: `Bearer ${token}`,
                            });
                        },
                        // ...
                    });
                    return result;
                }),
                fetchExchange]
        }));
}
