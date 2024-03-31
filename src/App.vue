<template>
    <v-app>
        <v-main>
            <router-view/>
        </v-main>
    </v-app>
</template>

<script lang="ts" setup>
import {onMounted, onUnmounted} from 'vue';
import {useLocale, useTheme} from 'vuetify'
import {useApiService} from './plugins/api';
import router from './router';
import AuthService from './services/auth.service';
import {supportLocales} from "@/locales";

onMounted(() => {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', systemThemeChange);
    if (window.navigator.language && supportLocales.includes(window.navigator.language.substring(0, 2))) {
        const {current} = useLocale();
        current.value = window.navigator.language.substring(0, 2);
    }
})
onUnmounted(() => window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', systemThemeChange))

const authService: AuthService | undefined = useApiService()?.authService;

router.beforeEach(async (to, from) => {
    const user = await authService?.getUser();
    if (to.name !== "/signin-callback" && user === null) {
        authService?.login();
        return false;
    } else {
        return true;
    }
})


const theme = useTheme()

toggleTheme();

function systemThemeChange() {
    toggleTheme();
}

function toggleTheme() {
    theme.global.name.value = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light'
}
</script>
