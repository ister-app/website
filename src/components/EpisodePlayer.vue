<template>
    <!-- Error -->
    <v-alert v-if="createPlayQueueError" type="error">{{ createPlayQueueError }}</v-alert>
    <v-alert v-if="updatePlayQueueError" type="error">{{ updatePlayQueueError }}</v-alert>

    <v-skeleton-loader v-if="createPlayQueueFetching" type="ossein" height="750px"></v-skeleton-loader>
    <Player v-else-if="episode.mediaFile?.length !== 0 && createPlayQueueData?.createPlayQueueForShow?.id !== undefined"
            :play-queue-id="createPlayQueueData?.createPlayQueueForShow.id"
            :mediaFile="episode.mediaFile![0]"
            :start-time="startTime" @ended="onPlayerEnded" @progress="onProgress"></Player>
    <template v-if="episode.metadata?.length !== 0">
        <p class="text-h6 mt-4">{{
                MetadataUtilService.getMetadataFieldForLanguage('title', episode.metadata, $t("iso-639-3"))
            }}</p>
        <p class="text-subtitle-2">{{
                MetadataUtilService.getMetadataFieldForLanguage('released', episode.metadata, $t("iso-639-3"))
            }}</p>
        <p class="mt-4 text-body-2">{{
                MetadataUtilService.getMetadataFieldForLanguage('description', episode.metadata, $t("iso-639-3"))
            }}</p>
    </template>
</template>

<script lang="ts" setup>
import {computed, ComputedRef, onUnmounted, watch} from 'vue';
import {useRouter} from "vue-router/auto";
import MetadataUtilService from "../services/metadataUtil.service";
import {Episode} from "@/generated-sources/gql/graphql";
import {useMutation} from "@urql/vue";
import {graphql} from "@/generated-sources/gql";

const router = useRouter()
let lastProgressUpdate: Date | undefined;
let currentProgress: number | undefined;
let currentItemId: undefined | string = undefined;

const props = defineProps<{
    episode: Episode
}>()

const createPlayQueueResult = useMutation(graphql(`
        mutation createPlayQueueForShow($id: ID!, $episodeId: ID!) {
        createPlayQueueForShow(showId: $id, episodeId: $episodeId) {
            id
            playQueueItems {
              id
              itemId
            }
            currentItem
          }
        }`
));

const createPlayQueueFetching = createPlayQueueResult.fetching;
const createPlayQueueError = createPlayQueueResult.error;
const createPlayQueueData = createPlayQueueResult.data;

function createPlayQueue(id: string, episodeId: string) {
    const variables = {id, episodeId};
    createPlayQueueResult.executeMutation(variables).then(value => {
        currentItemId = value.data?.createPlayQueueForShow?.playQueueItems?.find(item => item.itemId === props.episode.id)?.id;
    });
}

const updatePlayQueueResult = useMutation(graphql(`
        mutation updatePlayQueue($id: ID!, $playQueueItemId: ID!, $progressInMilliseconds: Int!) {
          updatePlayQueue(id: $id, playQueueItemId: $playQueueItemId, progressInMilliseconds: $progressInMilliseconds)
        }`
));

const updatePlayQueueFetching = updatePlayQueueResult.fetching;
const updatePlayQueueError = updatePlayQueueResult.error;
const updatePlayQueueData = updatePlayQueueResult.data;

function updatePlayQueue(id: string, playQueueItemId: string, progressInMilliseconds: number) {
    const variables = {id, playQueueItemId, progressInMilliseconds};
    updatePlayQueueResult.executeMutation(variables);
}

watch(props, () => {
    if (props.episode.id) {
        console.log("Item changed to: " + props.episode.id);
        currentItemId = createPlayQueueData.value?.createPlayQueueForShow?.playQueueItems?.find(item => item.itemId === props.episode.id)?.id;
    }
})

onUnmounted(() => {
    updateProgress();
});

start();

const startTime: ComputedRef<number | undefined> = computed(() => {
    if (props.episode.watchStatus && props.episode.watchStatus.length !== 0) {
        return props.episode.watchStatus[0].watched ? 0 : props.episode.watchStatus[0].progressInMilliseconds;
    } else {
        return 0;
    }
});

async function start() {
    currentProgress = undefined;
    createPlayQueue(props.episode.show!.id!, props.episode.id);
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
    if (createPlayQueueData.value?.createPlayQueueForShow?.playQueueItems) {
        const currentIndex = createPlayQueueData.value?.createPlayQueueForShow?.playQueueItems.findIndex(item => item.id === currentItemId);
        if (currentIndex !== -1 && createPlayQueueData.value?.createPlayQueueForShow?.playQueueItems.length > currentIndex + 1) {
            const nextItem = createPlayQueueData.value?.createPlayQueueForShow?.playQueueItems[currentIndex + 1];
            console.log("Go to next item: " + nextItem.itemId);
            router.push({
                name: "/shows/[id]/episodes.[episodeId]",
                params: {id: props.episode.show!.id!, episodeId: nextItem?.itemId!}
            });
        }
    }
}

function updateProgress() {
    if (currentProgress && props.episode && props.episode.id && createPlayQueueData.value?.createPlayQueueForShow && createPlayQueueData.value.createPlayQueueForShow.id && currentItemId) {
        updatePlayQueue(createPlayQueueData.value?.createPlayQueueForShow.id, currentItemId, Math.round(currentProgress))
    }
}
</script>
