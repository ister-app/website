<template>
    <Player v-if="episodeEntity.mediaFileEntities?.length !== 0" :mediaFileEntity="episodeEntity.mediaFileEntities![0]"
            :start-time="startTime" @ended="onPlayerEnded" @progress="onProgress"></Player>
    <template v-if="episodeEntity.metadataEntities?.length !== 0">
        <p class="text-h6 mt-4">{{ MetadataUtilService.getMetadataFieldForLanguage('title', episodeEntity.metadataEntities, $t("iso-639-3")) }}</p>
        <p class="text-subtitle-2">{{ MetadataUtilService.getMetadataFieldForLanguage('released', episodeEntity.metadataEntities, $t("iso-639-3")) }}</p>
        <p class="mt-4 text-body-2">{{ MetadataUtilService.getMetadataFieldForLanguage('description', episodeEntity.metadataEntities, $t("iso-639-3")) }}</p>
    </template>
</template>

<script lang="ts" setup>
import {EpisodeEntity} from "@/generated-sources/openapi";
import {useApiService} from "@/plugins/api";
import PlayQueueService from "@/services/playQueue.service";
import {computed, ComputedRef, onUnmounted, watch} from 'vue';
import {useRouter} from "vue-router/auto";
import MetadataUtilService from "../services/metadataUtil.service";

const router = useRouter()
const apiService = useApiService();
let playQueueService: PlayQueueService;
let lastProgressUpdate: Date | undefined;
let currentProgress: number | undefined;

const props = defineProps<{
    episodeEntity: EpisodeEntity
}>()

watch(props, () => {
    if (props.episodeEntity.id) {
        console.log("Item changed to: " + props.episodeEntity.id);
        playQueueService.setCurrentItem(props.episodeEntity.id);
    }
})

onUnmounted(() => {
    updateProgress();
});

start();

const startTime: ComputedRef<number | undefined> = computed(() => {
    if (props.episodeEntity.watchStatusEntities && props.episodeEntity.watchStatusEntities.length !== 0) {
        return props.episodeEntity.watchStatusEntities[0].watched ? 0 : props.episodeEntity.watchStatusEntities[0].progressInMilliseconds;
    } else {
        return 0;
    }
});

async function start() {
    currentProgress = undefined;
    playQueueService = new PlayQueueService(await apiService?.getPlayQueueControllerApi()!);
    await playQueueService.createPlayQueueForShow(props.episodeEntity.showEntity!.id!, props.episodeEntity.id!);
}

function onProgress(progress: number) {
    currentProgress = progress;
    if (lastProgressUpdate == undefined || new Date().getTime() - lastProgressUpdate.getTime() > 10 * 1000) {
        lastProgressUpdate = new Date();
        updateProgress();
    }
}

function onPlayerEnded() {
    updateProgress()
    const nextItem = playQueueService.getNextItem();
    if (nextItem && nextItem.itemId) {
        console.log("Go to next item: " + nextItem.itemId);
        router.push({
            name: "/tvshows/[id]/episodes.[episodeId]",
            params: {id: props.episodeEntity.showEntity!.id!, episodeId: nextItem?.itemId!}
        });
    }
}

function updateProgress() {
    if (currentProgress && props.episodeEntity && props.episodeEntity.id) {
        playQueueService.updateProgress(props.episodeEntity.id, currentProgress);
    }
}

</script>
