<template>
    <Player v-if="episodeEntity.mediaFileEntities?.length !== 0" :mediaFileEntity="episodeEntity.mediaFileEntities![0]" @ended="onPlayerEnded"></Player>
    <template v-if="episodeEntity.metadataEntities?.length !== 0">
        <p class="text-h6 mt-4">{{ episodeEntity.metadataEntities![0].title }}</p>
        <p class="text-subtitle-2">{{ episodeEntity.metadataEntities![0].released }}</p>
        <p class="mt-4 text-body-2">{{ episodeEntity.metadataEntities![0].description }}</p>
    </template>
</template>

<script lang="ts" setup>
import { EpisodeEntity } from "@/generated-sources/openapi";
import { useApiService } from "@/plugins/api";
import PlayQueueService from "@/services/playQueue.service";
import { watch } from 'vue';
import { useRouter } from "vue-router/auto";

const props = defineProps<{
    episodeEntity: EpisodeEntity
}>()

watch(props, () => {
    if (props.episodeEntity.id) {
        console.log("Item changed to: " + props.episodeEntity.id);
        playQueueService.setCurrentItem(props.episodeEntity.id);
    }
})

const router = useRouter()
const apiService = useApiService();
var playQueueService: PlayQueueService;

start();

async function start() {
    playQueueService = new PlayQueueService(await apiService?.getPlayQueueControllerApi()!);
    playQueueService.createPlayQueueForShow(props.episodeEntity.showEntity.id!, props.episodeEntity.id!);
}


function onPlayerEnded() {
    const nextItem = playQueueService.getNextItem();
    if (nextItem && nextItem.itemId) {
        console.log("Go to next item: " + nextItem.itemId);
        router.push({ name: "/tvshows/[id]/episodes.[episodeId]", params: {id: props.episodeEntity.showEntity.id!, episodeId: nextItem?.itemId!} });
    }
}

</script>
