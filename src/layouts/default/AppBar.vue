<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <v-icon icon="mdi-circle-slice-6" />
      Ister
    </v-app-bar-title>

    <template v-slot:append>
    <v-btn icon="mdi-home" :to="{ name: '/'}" variant="plain"></v-btn>
    <v-btn icon="mdi-refresh" @click="refresh()" variant="plain"></v-btn>

  </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { Configuration, ScannerControllerApi } from '@/generated-sources/openapi';

const configuration = new Configuration({
  basePath: 'http://localhost:8080',
});

function refresh() {
  new ScannerControllerApi(configuration).scan();
}
</script>
