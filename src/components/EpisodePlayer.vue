<template>
    <!-- Error -->
    <v-alert v-if="createPlayQueueError" type="error">{{ createPlayQueueError }}</v-alert>
    <v-alert v-if="updatePlayQueueError" type="error">{{ updatePlayQueueError }}</v-alert>

    <Player v-if="episode.mediaFile?.length !== 0" :mediaFile="episode.mediaFile![0]"
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
        mutation createPlayQueue($id: ID!) {
        createPlayQueue(showId: $id) {
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

function createPlayQueue(id: string) {
    const variables = { id };
    createPlayQueueResult.executeMutation(variables).then(value => {
        currentItemId = value.data?.createPlayQueue?.playQueueItems?.find(item => item.itemId === props.episode.id)?.id;
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
    const variables = { id, playQueueItemId, progressInMilliseconds };
    updatePlayQueueResult.executeMutation(variables);
}

watch(props, () => {
    if (props.episode.id) {
        console.log("Item changed to: " + props.episode.id);
        currentItemId = createPlayQueueData.value?.createPlayQueue?.playQueueItems?.find(item => item.itemId === props.episode.id)?.id;
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
    createPlayQueue(props.episode.show!.id!);
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
    if (createPlayQueueData.value?.createPlayQueue?.playQueueItems) {
        const currentIndex = createPlayQueueData.value?.createPlayQueue?.playQueueItems.findIndex(item => item.id === currentItemId);
        if (currentIndex !== -1 && createPlayQueueData.value?.createPlayQueue?.playQueueItems.length > currentIndex + 1) {
            const nextItem = createPlayQueueData.value?.createPlayQueue?.playQueueItems[currentIndex + 1];
            console.log("Go to next item: " + nextItem.itemId);
            router.push({
                name: "/shows/[id]/episodes.[episodeId]",
                params: {id: props.episode.show!.id!, episodeId: nextItem?.itemId!}
            });
        }
    }
}

function updateProgress() {
    if (currentProgress && props.episode && props.episode.id && createPlayQueueData.value?.createPlayQueue && createPlayQueueData.value.createPlayQueue.id && currentItemId) {
        updatePlayQueue(createPlayQueueData.value?.createPlayQueue.id, currentItemId, Math.round(currentProgress))
    }
}
</script>
