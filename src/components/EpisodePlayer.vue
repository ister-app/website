<template>
    <Player :mediaFileEntity="episodeEntity.mediaFileEntities![0]"></Player>
    <p class="text-h6 mt-4">Episode title</p>
    <p class="text-subtitle-2">episodeEntity {{ episodeEntity.number }} * Mrt 2022 * 41m</p>
    <p class="mt-4 text-body-2">Episode description</p>
    {{ episodeEntity.mediaFileEntities![0].path }} -
    {{ episodeEntity.mediaFileEntities![0].id }}

    <!-- <v-btn @click="loaded = !loaded">test</v-btn> -->
    {{ props.episodeEntity.mediaFileEntities }}
</template>

<script lang="ts" setup>
import { ref, onUnmounted, onUpdated } from 'vue'
import type { Ref } from 'vue'
import { Configuration, EpisodeEntity, TranscoderControllerApi, MediaFileEntity } from "@/generated-sources/openapi";

import TranscodeService from "@/services/transcode.service";

const props = defineProps<{
    episodeEntity: EpisodeEntity
}>()

// const transcodeService = new TranscodeService();



// transcodeService.start(props.episodeEntity, 0)


// onUpdated(() => {
//     var id: string | undefined;
//     props.episodeEntity.mediaFiles?.forEach((file: MediaFile) => id = file.id);
    // if (id !== loadedId) {
    //     stop();
    //     setTimeout(refresh, 4000);
    // }
// })

onUnmounted(() => {
    // transcodeService.stop();
})

</script>
