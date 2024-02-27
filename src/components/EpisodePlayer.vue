<template>
    <Player v-if="episodeEntity.mediaFileEntities?.length !== 0" :mediaFileEntity="episodeEntity.mediaFileEntities![0]"></Player>
    <template v-if="episodeEntity.metadataEntities?.length !== 0">
        <p class="text-h6 mt-4">{{ episodeEntity.metadataEntities![0].title }}</p>
        <p class="text-subtitle-2">{{ episodeEntity.metadataEntities![0].released }}</p>
        <p class="mt-4 text-body-2">{{ episodeEntity.metadataEntities![0].description }}</p>
    </template>
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
