<template>
    <v-container v-if="showEntity?.metadataEntities?.length !== 0">
        {{ MetadataUtilService.getMetadataFieldForLanguage('description', showEntity?.metadataEntities, $t("iso-639-3")) }}
    </v-container>
</template>

<script lang="ts" setup>
import {EpisodeEntity, ShowEntity} from '@/generated-sources/openapi';
import {computed} from "vue";
import MetadataUtilService from "@/services/metadataUtil.service";

const props = defineProps<{
    showEntity: ShowEntity | undefined,
}>()

const emit = defineEmits<{
    (e: 'newEpisodeEntity', episodeEntity: EpisodeEntity | undefined): void
}>()

emit('newEpisodeEntity', undefined);

/*const description = computed (() => {
    console.log("test");
    if (props?.showEntity?.metadataEntities) {
        return MetadataUtilService.getDescription(props?.showEntity?.metadataEntities, $t("iso-639-3"));
    } else {
        return "niks";
    }
});*/
</script>
