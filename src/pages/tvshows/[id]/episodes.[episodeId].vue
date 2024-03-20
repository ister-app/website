<template>
     <EpisodePlayer v-if="episodeEntity" :episodeEntity="episodeEntity"></EpisodePlayer>
</template>
    
<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import { EpisodeEntity, ShowEntity } from "@/generated-sources/openapi";
import { useRoute } from 'vue-router/auto';
import { useApiService } from '@/plugins/api';

const props = defineProps<{
    showEntity: ShowEntity | undefined,
}>()

const emit = defineEmits<{
  (e: 'newEpisodeEntity', episodeEntity: EpisodeEntity): void
}>()

const route = useRoute("/tvshows/[id]/episodes.[episodeId]");

watch(() => route.params, () => {
    refreshEpisode();
});

const apiService = useApiService();

const episodeEntity: Ref<EpisodeEntity | undefined> = ref()

async function refreshEpisode() {
    if (route.params.episodeId !== undefined) {
        const postsApi = await apiService?.getEpisodeControllerApi();
        const posts: Promise<EpisodeEntity> = postsApi!.getEpisode({ id: route.params.episodeId.toString() });
        posts.then((response: EpisodeEntity) => {
            episodeEntity.value = response;
            emit("newEpisodeEntity", episodeEntity.value)
        })
    }
}

if (route.params.episodeId) {
    refreshEpisode();
}
</script>