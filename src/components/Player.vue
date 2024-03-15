<template>
  <v-theme-provider theme="dark">
    <div ref="root">
      <div class="fullscreen-wrapper" :class="controllsVisable ? '' : 'hide-mouse'" @mousemove="onHover()">
        <div class="video-container">
          <video class="video" ref="video" width="100%" poster="" @click="onVideoClick()" :disable-picture-in-picture="true"></video>
          <div class="loader" v-if="buffering"><v-progress-circular indeterminate></v-progress-circular></div>
          <div class="loader" v-else-if="paused">
            <v-btn :disabled="buffering" class="control-item me-auto" density="compact"
              :icon="paused ? 'mdi-play' : 'mdi-pause'" @click="playPause()"></v-btn>
          </div>

          <div v-if="controllsVisable" class="controlls">
            <div class="d-flex text-white">
              <p class="control-item">{{ new Date((offsetTime + currentTime) * 1000).toISOString().slice(11, 19) }}</p>
              <v-slider class="flex-grow-1 flex-shrink-1 control-item" color="primary" thumb-color="white"
                v-model="progres" @click="goToTime()"></v-slider>
              <p class="control-item">{{ new Date(durationTime * 1000).toISOString().slice(11, 19) }}</p>
            </div>

            <div class="d-flex text-white">
              <v-btn :disabled="buffering" class="control-item me-auto" density="compact"
                :icon="paused ? 'mdi-play' : 'mdi-pause'" @click="playPause()"></v-btn>

              <v-icon class="control-item" icon="mdi-volume-high"></v-icon>
              <v-slider class="flex-grow-0 flex-shrink-1 control-item" color="primary" thumb-color="white"
                style="width: 50px;" v-model="volume" @click="changeVolume()"></v-slider>
              <div class="flex-grow-1 flex-shrink-1"></div>
              <MediaFileStreamsSelector :mediaFileStreams="mediaFileEntity.mediaFileStreamEntity"
                v-model:selectedAudioStream="selectedAudioStream" v-model:selectedSubtitleStream="selectedSubtitleStream">
              </MediaFileStreamsSelector>
              <v-btn class="control-item" density="compact" icon="mdi-fullscreen" @click="toggle()"></v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-theme-provider>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, onUnmounted, watch } from 'vue';
import type { Ref } from 'vue'
import Hls from 'hls.js';
import { api as fullscreen } from 'vue-fullscreen'
import { MediaFileEntity } from '@/generated-sources/openapi';
import TranscodeService from '@/services/transcode.service';

const props = defineProps<{
  mediaFileEntity: MediaFileEntity
}>()

const state = reactive({
  fullscreen: false,
  teleport: false,
})

const root = ref()

const controllsVisable: Ref<Boolean> = ref(true);
var showControllsTimeout: number | undefined;

const video: Ref<HTMLVideoElement | undefined> = ref();
const startedPlaying = ref(false);
const paused = ref(false);
const progres: Ref<number> = ref(0);
const currentTime: Ref<number> = ref(0);
const volume: Ref<number> = ref(100);
const selectedAudioStream: Ref<string | undefined> = ref();
const selectedSubtitleStream: Ref<string | undefined> = ref();

const durationTime: Ref<number> = ref(3600);
const offsetTime: Ref<number> = ref(0);
const transcodeSesionId: Ref<String | undefined> = ref();
const buffering = ref(false);

var hls = new Hls({ startPosition: 0 });
const transcodeService = new TranscodeService();

onMounted(() => startPlaying())

watch(props, () => {
  stop();
  offsetTime.value = 0;
  selectedAudioStream.value = undefined;
  selectedSubtitleStream.value = undefined;
  startPlaying();
})

watch(selectedAudioStream, () => {
  stop();
  offsetTime.value = Math.round(progres.value * durationTime.value / 100);
  startPlaying();
})

watch(selectedSubtitleStream, () => {
  stop();
  offsetTime.value = Math.round(progres.value * durationTime.value / 100);
  startPlaying();
})

async function toggle() {
  await fullscreen.toggle(root.value.querySelector('.fullscreen-wrapper'), {
    teleport: state.teleport,
    callback: (isFullscreen) => {
      // state.fullscreen = isFullscreen
    },
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
  // video.value.currentTime = (progres.value * durationTime.value / 100) - offsetTime.value;
  offsetTime.value = Math.round(progres.value * durationTime.value / 100);
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

function handleEvent(event: any) {
  if (video.value) {
    progres.value = (offsetTime.value + video.value.currentTime) * 100 / durationTime.value;
    currentTime.value = video.value.currentTime;
  }
}

function handleVolumeEvent(event: any) {
  if (video.value !== undefined) {
    volume.value = video.value.volume * 100;
  }
}

function handlePlayingEvent(event: any) {
  if (video.value !== undefined) {
    paused.value = video.value.paused;
  }
}

const startPlaying = async () => {
  console.log("start")
  buffering.value = true;
  durationTime.value = props.mediaFileEntity.durationInMilliseconds ? props.mediaFileEntity.durationInMilliseconds / 1000 : 3600;
  transcodeSesionId.value = await transcodeService.start(props.mediaFileEntity, offsetTime.value, selectedAudioStream.value, selectedSubtitleStream.value);
  buffering.value = false;
  startedPlaying.value = true;
  if (Hls.isSupported()) {
    console.log(transcodeService.getStreamUrl());
    hls.loadSource(transcodeService.getStreamUrl());
    if (video.value !== undefined) {
      hls.attachMedia(video.value);
      video.value.play();
      video.value.addEventListener("timeupdate", handleEvent);
      video.value.addEventListener("volumechange", handleVolumeEvent);
      video.value.addEventListener("play", handlePlayingEvent);
      video.value.addEventListener("pause", handlePlayingEvent);
    }
  }
};

async function stop() {
  console.log("stop")
  startedPlaying.value = false;
  if (video.value !== undefined) {
    video.value.removeEventListener("timeupdate", handleEvent);
    video.value.removeEventListener("volumechange", handleVolumeEvent);
    video.value.removeEventListener("play", handlePlayingEvent);
    video.value.removeEventListener("pause", handlePlayingEvent);
  }
  video.value?.pause();
  hls.stopLoad();
  return await transcodeService.stop();
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
  /* font-size: 20px; */
  /* font-family: Helvetica; */
  /* color: #FFF; */
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
