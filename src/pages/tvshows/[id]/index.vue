<template>
    <v-container v-if="showEntity?.metadataEntities?.length !== 0">{{
        showEntity?.metadataEntities![0].description }}</v-container>
</template>

<script lang="ts" setup>
import { ShowEntity } from '@/generated-sources/openapi';

const props = defineProps<{
    showEntity: ShowEntity | undefined,
}>()
</script>