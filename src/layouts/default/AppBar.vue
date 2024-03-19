<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <v-btn icon="mdi-sofa-single" :to="{ name: '/'}" variant="plain"></v-btn>
      Ister
    </v-app-bar-title>

    <template v-slot:append>
    <v-btn icon="mdi-home" :to="{ name: '/'}" variant="plain"></v-btn>
    <v-btn icon="mdi-refresh" @click="refresh()" variant="plain"></v-btn>

  </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { useApiService } from '@/plugins/api';

const apiService = useApiService();

async function refresh() {
  (await apiService?.getScannerControllerApi())!.scan();
}
</script>
