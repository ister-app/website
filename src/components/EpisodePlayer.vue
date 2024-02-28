<template>
    <Player v-if="episodeEntity.mediaFileEntities?.length !== 0" :mediaFileEntity="episodeEntity.mediaFileEntities![0]"></Player>
    <template v-if="episodeEntity.metadataEntities?.length !== 0">
        <p class="text-h6 mt-4">{{ episodeEntity.metadataEntities![0].title }}</p>
        <p class="text-subtitle-2">{{ episodeEntity.metadataEntities![0].released }}</p>
        <p class="mt-4 text-body-2">{{ episodeEntity.metadataEntities![0].description }}</p>
    </template>
</template>

<script lang="ts" setup>
import { EpisodeEntity } from "@/generated-sources/openapi";

const props = defineProps<{
    episodeEntity: EpisodeEntity
}>()

</script>
