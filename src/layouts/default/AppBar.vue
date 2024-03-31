<template>
    <v-app-bar flat>
        <v-app-bar-title>
            <v-btn :to="{ name: '/'}" icon="mdi-sofa-single" variant="plain"></v-btn>
            Ister
        </v-app-bar-title>

        <template v-slot:append>
            <v-btn :to="{ name: '/'}" icon="mdi-home" variant="plain"></v-btn>
            <v-btn icon="mdi-refresh" variant="plain" @click="refresh()"></v-btn>

        </template>
    </v-app-bar>
</template>

<script lang="ts" setup>
import {useApiService} from '@/plugins/api';

const apiService = useApiService();

async function refresh() {
    (await apiService?.getScannerControllerApi())!.scan();
}
</script>
