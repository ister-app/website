<template>
    <!-- Error -->
    <v-alert v-if="createPlayQueueError" type="error">{{ createPlayQueueError }}</v-alert>
    <v-alert v-if="updatePlayQueueError" type="error">{{ updatePlayQueueError }}</v-alert>

    <v-skeleton-loader v-if="createPlayQueueFetching" type="ossein" height="750px"></v-skeleton-loader>
    <Player v-else-if="movie.mediaFile?.length !== 0 && createPlayQueueData?.createPlayQueueForMovie?.id !== undefined"
            :play-queue-id="createPlayQueueData?.createPlayQueueForMovie.id"
            :mediaFile="movie.mediaFile![0]"
            :start-time="startTime" @ended="onPlayerEnded" @progress="onProgress"></Player>
    <template v-if="movie.metadata?.length !== 0">
        <p class="text-h6 mt-4">{{
                MetadataUtilService.getMetadataFieldForLanguage('title', movie.metadata, $t("iso-639-3"))
            }}</p>
        <p class="text-subtitle-2">{{
                MetadataUtilService.getMetadataFieldForLanguage('released', movie.metadata, $t("iso-639-3"))
            }}</p>
        <p class="mt-4 text-body-2">{{
                MetadataUtilService.getMetadataFieldForLanguage('description', movie.metadata, $t("iso-639-3"))
            }}</p>
    </template>
</template>

<script lang="ts" setup>
import {computed, ComputedRef, onUnmounted, watch} from 'vue';
import {useRouter} from "vue-router/auto";
import MetadataUtilService from "../services/metadataUtil.service";
import {Movie} from "@/generated-sources/gql/graphql";
import {useMutation} from "@urql/vue";
import {graphql} from "@/generated-sources/gql";

const router = useRouter()
let lastProgressUpdate: Date | undefined;
let currentProgress: number | undefined;
let currentItemId: undefined | string = undefined;

const props = defineProps<{
    movie: Movie
}>()

const createPlayQueueResult = useMutation(graphql(`
        mutation createPlayQueueForMovie($movieId: ID!) {
        createPlayQueueForMovie(movieId: $movieId) {
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

function createPlayQueue(movieId: string) {
    const variables = {movieId};
    createPlayQueueResult.executeMutation(variables).then(value => {
        currentItemId = value.data?.createPlayQueueForMovie?.playQueueItems?.find(item => item.itemId === props.movie.id)?.id;
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
    if (props.movie.id) {
        console.log("Item changed to: " + props.movie.id);
        currentItemId = createPlayQueueData.value?.createPlayQueueForMovie?.playQueueItems?.find(item => item.itemId === props.movie.id)?.id;
    }
})

onUnmounted(() => {
    updateProgress();
});

start();

const startTime: ComputedRef<number | undefined> = computed(() => {
    if (props.movie.watchStatus && props.movie.watchStatus.length !== 0) {
        return props.movie.watchStatus[0].watched ? 0 : props.movie.watchStatus[0].progressInMilliseconds;
    } else {
        return 0;
    }
});

async function start() {
    currentProgress = undefined;
    createPlayQueue(props.movie.id);
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
    if (createPlayQueueData.value?.createPlayQueueForMovie?.playQueueItems) {
        const currentIndex = createPlayQueueData.value?.createPlayQueueForMovie?.playQueueItems.findIndex(item => item.id === currentItemId);
        if (currentIndex !== -1 && createPlayQueueData.value?.createPlayQueueForMovie?.playQueueItems.length > currentIndex + 1) {
            const nextItem = createPlayQueueData.value?.createPlayQueueForMovie?.playQueueItems[currentIndex + 1];
            console.log("Go to next item: " + nextItem.itemId);
            router.push({
                name: "/movies/[id]",
                params: {id: props.movie.id!}
            });
        }
    }
}

function updateProgress() {
    if (currentProgress && props.movie && props.movie.id && createPlayQueueData.value?.createPlayQueueForMovie && createPlayQueueData.value.createPlayQueueForMovie.id && currentItemId) {
        updatePlayQueue(createPlayQueueData.value?.createPlayQueueForMovie.id, currentItemId, Math.round(currentProgress))
    }
}
</script>
