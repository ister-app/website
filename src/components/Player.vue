<template>
    <v-theme-provider theme="dark">
        <div ref="root">
            <div :class="controllsVisable ? '' : 'hide-mouse'" class="fullscreen-wrapper" @mousemove="onHover()">
                <div class="video-container">
                    <video ref="video" :disable-picture-in-picture="true" class="video" poster="" width="100%"
                           @click="onVideoClick()"></video>
                    <div v-if="buffering" class="loader">
                        <v-progress-circular indeterminate></v-progress-circular>
                    </div>
                    <div v-else-if="paused" class="loader">
                        <v-btn :disabled="buffering" :icon="paused ? 'mdi-play' : 'mdi-pause'" class="control-item me-auto"
                               density="compact" @click="playPause()"></v-btn>
                    </div>

                    <div v-if="controllsVisable" class="controlls">
                        <div class="d-flex text-white">
                            <p class="control-item">
                                {{ new Date((offsetTime + currentTime) * 1000).toISOString().slice(11, 19) }}</p>
                            <v-slider v-model="progress" class="flex-grow-1 flex-shrink-1 control-item" color="primary"
                                      thumb-color="white" @click="goToTime()"></v-slider>
                            <p class="control-item">{{ new Date(durationTime * 1000).toISOString().slice(11, 19) }}</p>
                        </div>

                        <div class="d-flex text-white">
                            <v-btn :disabled="buffering" :icon="paused ? 'mdi-play' : 'mdi-pause'" class="control-item me-auto"
                                   density="compact" @click="playPause()"></v-btn>

                            <v-icon class="control-item" icon="mdi-volume-high"></v-icon>
                            <v-slider v-model="volume" class="flex-grow-0 flex-shrink-1 control-item" color="primary"
                                      style="width: 50px;" thumb-color="white" @click="changeVolume()"></v-slider>
                            <div class="flex-grow-1 flex-shrink-1"></div>
                            <MediaFileStreamsSelector v-model:selectedAudioStream="selectedAudioStream"
                                                      v-model:selectedSubtitleStream="selectedSubtitleStream"
                                                      :mediaFileStreams="mediaFile.mediaFileStreams">
                            </MediaFileStreamsSelector>
                            <v-btn class="control-item" density="compact" icon="mdi-fullscreen"
                                   @click="toggle()"></v-btn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </v-theme-provider>
</template>

<script lang="ts" setup>
import type {Ref} from 'vue'
import {onMounted, onUnmounted, reactive, ref, watch} from 'vue';
import Hls from 'hls.js';
import {api as fullscreen} from 'vue-fullscreen'
import {MediaFile} from "@/generated-sources/gql/graphql";
import {useApiService} from "@/plugins/api";
import {useMutation} from "@urql/vue";
import {graphql} from "@/generated-sources/gql";

const props = defineProps<{
    mediaFile: MediaFile,
    startTime: number | undefined,
    playQueueId: string,
}>()

const emit = defineEmits<{
    (e: 'ended'): void
    (e: 'progress', progress: number): void
}>()

const state = reactive({
    fullscreen: false,
    teleport: false,
})

const apiService = useApiService();
const root = ref()

const controllsVisable: Ref<boolean> = ref(true);
let showControllsTimeout: number | undefined;

const video: Ref<HTMLVideoElement | undefined> = ref();
const startedPlaying = ref(false);
const paused = ref(false);
const progress: Ref<number> = ref(0);
const currentTime: Ref<number> = ref(0);
const volume: Ref<number> = ref(100);
const selectedAudioStream: Ref<string | undefined> = ref();
const selectedSubtitleStream: Ref<string | undefined> = ref();

const durationTime: Ref<number> = ref(3600);
const offsetTime: Ref<number> = ref(0);
const transcodeSessionId: Ref<string | undefined> = ref();
const buffering = ref(false);

let hls: Hls;

const startTranscodingResult = useMutation(graphql(`
        mutation startTranscoding($playQueueId: ID!, $mediaFileId: ID!, $startTimeInSeconds: Int!, $audioId: ID, $subtitleId: ID) {
            startTranscoding(playQueueId: $playQueueId, mediaFileId: $mediaFileId, startTimeInSeconds: $startTimeInSeconds, audioId: $audioId, subtitleId: $subtitleId)
        }`
));

function startTranscoding(playQueueId: string, mediaFileId: string, startTimeInSeconds: number, audioId: string | undefined, subtitleId: string | undefined) {
    const variables = { playQueueId, mediaFileId, startTimeInSeconds, audioId, subtitleId };
    startTranscodingResult.executeMutation(variables);
}

const readyTranscodingResult = useMutation(graphql(`
        mutation readyTranscoding($id: ID!) {
            readyTranscoding(id: $id)
        }`
));

async function readyTranscoding(id: string): Promise<boolean> {
    const variables = {id};
    return await readyTranscodingResult.executeMutation(variables).then(async value => {
        if (value.data?.readyTranscoding) {
            return true;
        } else {
            await pause();
            return readyTranscoding(id);
        }
    })
}

const stopTranscodingResult = useMutation(graphql(`
        mutation stopTranscoding($id: ID!) {
        stopTranscoding(id: $id)
        }`
));

async function stopTranscoding(id: string): Promise<boolean | undefined> {
    const variables = {id};
    return (await stopTranscodingResult.executeMutation(variables)).data?.stopTranscoding;
}

function pause() {
    return new Promise((resolve, reject) => setTimeout(() => {
        resolve(1);
    }, 1500));
}

watch(() => startTranscodingResult.data.value, async () => {
    if (startTranscodingResult.data.value !== undefined) {
        transcodeSessionId.value = startTranscodingResult.data.value.startTranscoding;
        await readyTranscoding(startTranscodingResult.data.value.startTranscoding);
        buffering.value = false;
        startedPlaying.value = true;
        if (Hls.isSupported()) {
            hls.loadSource(import.meta.env.VITE_BACKEND_URL + '/transcode/download/' + startTranscodingResult.data.value.startTranscoding + '/index.m3u8');
            if (video.value !== undefined) {
                hls.attachMedia(video.value);
                video.value.play();
                video.value.addEventListener("timeupdate", handleTimeUpdateEvent);
                video.value.addEventListener("volumechange", handleVolumeEvent);
                video.value.addEventListener("play", handlePlayingEvent);
                video.value.addEventListener("pause", handlePlayingEvent);
                video.value.addEventListener("ended", handleEndedEvent);
            }
        }
    }

});

onMounted(async () => {
    hls = new Hls({
        startPosition: 0,
        xhrSetup: async function (xhr, url) {
            xhr.setRequestHeader("Authorization", "Bearer " + await apiService?.authService?.getToken())
        },
    });
    if (props.startTime) {
        offsetTime.value = Math.round(props.startTime / 1000);
    }
    startPlaying()
})

watch(props, () => {
    stop();
    offsetTime.value = 0;
    selectedAudioStream.value = undefined;
    selectedSubtitleStream.value = undefined;
    if (props.startTime) {
        offsetTime.value = Math.round(props.startTime / 1000);
    }
    startPlaying();
})

watch(selectedAudioStream, () => {
    stop();
    offsetTime.value = Math.round(progress.value * durationTime.value / 100);
    startPlaying();
})

watch(selectedSubtitleStream, () => {
    stop();
    offsetTime.value = Math.round(progress.value * durationTime.value / 100);
    startPlaying();
})

async function toggle() {
    await fullscreen.toggle(root.value.querySelector('.fullscreen-wrapper'), {
        teleport: state.teleport,
    })
    state.fullscreen = fullscreen.isFullscreen
}


function changeVolume() {
    video.value!.volume = volume.value / 100;
}

function playPause() {
    if (video.value?.paused || video.value?.ended) video.value.play();
    else video.value?.pause();
}

function goToTime() {
    stop();
    offsetTime.value = Math.round(progress.value * durationTime.value / 100);
    startPlaying();
}

function onVideoClick() {
    playPause();
}

function onHover() {
    showControlls();
}

function showControlls() {
    controllsVisable.value = true;
    if (showControllsTimeout) {
        clearTimeout(showControllsTimeout);
    }
    showControllsTimeout = window.setTimeout(hideControls, 3000);
}

function hideControls() {
    controllsVisable.value = false;
}

function handleTimeUpdateEvent(_event: Event) {
    if (video.value) {
        progress.value = (offsetTime.value + video.value.currentTime) * 100 / durationTime.value;
        currentTime.value = video.value.currentTime;
        emit("progress", (offsetTime.value + currentTime.value) * 1000);
    }
}

function handleVolumeEvent(_event: Event) {
    if (video.value !== undefined) {
        volume.value = video.value.volume * 100;
    }
}

function handlePlayingEvent(_event: Event) {
    if (video.value !== undefined) {
        paused.value = video.value.paused;
    }
}

function handleEndedEvent(_event: Event) {
    emit("ended");
}

async function startPlaying() {
    console.log("start")
    buffering.value = true;
    durationTime.value = props.mediaFile.durationInMilliseconds ? props.mediaFile.durationInMilliseconds / 1000 : 3600;
    startTranscoding(props.playQueueId, props.mediaFile.id, offsetTime.value, selectedAudioStream.value, selectedSubtitleStream.value);
}

async function stop() {
    console.log("stop")
    startedPlaying.value = false;
    if (video.value !== undefined) {
        try {
            video.value.removeEventListener("timeupdate", handleTimeUpdateEvent);
            video.value.removeEventListener("volumechange", handleVolumeEvent);
            video.value.removeEventListener("play", handlePlayingEvent);
            video.value.removeEventListener("pause", handlePlayingEvent);
            video.value.removeEventListener("ended", handleEndedEvent);
            video.value.pause();
        } catch (error) {
            console.log("Video value removed before removing event listeners.")
        }
    }
    hls.stopLoad();
    if (transcodeSessionId.value) {
        return await stopTranscoding(transcodeSessionId.value);
    }
}

onUnmounted(() => {
    stop();
    hls.destroy();
});
</script>

<style>
.video-container {
    position: relative;
    height: 100%;
}

.video {
    height: 100%;
}

.hide-mouse {
    cursor: none;
}

.control-item {
    margin-left: 10px !important;
    margin-right: 10px !important;
}

.controlls {
    position: absolute;
    bottom: 0px;
    padding: 5px;
    width: 100%;
    background-color: rgba(50, 50, 50, 0.5);
}

.loader {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 5px;
    background-color: rgba(50, 50, 50, 0.5);
}
</style>
