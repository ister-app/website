<template>
    <v-container v-if="showEntity?.metadataEntities?.length !== 0">{{
            showEntity?.metadataEntities![0].description
        }}
    </v-container>
</template>

<script lang="ts" setup>
import {EpisodeEntity, ShowEntity} from '@/generated-sources/openapi';

defineProps<{
    showEntity: ShowEntity | undefined,
}>()

const emit = defineEmits<{
    (e: 'newEpisodeEntity', episodeEntity: EpisodeEntity | undefined): void
}>()

emit('newEpisodeEntity', undefined);
</script>
