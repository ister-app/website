<template>
    <v-container v-if="show?.metadata?.length !== 0">
        {{ MetadataUtilService.getMetadataFieldForLanguage('description', show?.metadata, $t("iso-639-3")) }}
    </v-container>
</template>

<script lang="ts" setup>
import MetadataUtilService from "@/services/metadataUtil.service";
import {Episode, Show} from "@/generated-sources/gql/graphql";

defineProps<{
    show: Show | undefined,
}>()

const emit = defineEmits<{
    (e: 'newEpisodeId', newEpisodeId: string | undefined): void
    (e: 'newSeasonId', newEpisodeId: string | undefined): void
}>()

emit('newEpisodeId', undefined);
emit('newSeasonId', undefined);
</script>
