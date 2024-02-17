<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue';
import { useTheme } from 'vuetify'

onMounted(() => window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', systemThemeChange))
onUnmounted(() => window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', systemThemeChange))


const theme = useTheme()

toggleTheme();

function systemThemeChange() {
  toggleTheme();
}

function toggleTheme () {
  theme.global.name.value = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light'
}
</script>
