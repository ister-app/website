<template>
    <!-- Error -->
    <v-alert v-if="error" type="error">{{ error }}</v-alert>

    <v-list :id="'list-' + seasonId" v-model:selected="selected" class="overflow-auto" density="compact" height="500px">
        <v-list-item v-for="episode in data?.seasonById?.episodes" v-if="!fetching" :id="'list-item-' + episode.id"
                     :key="episode.id"
                     :to="{ name: '/shows/[id]/episodes.[episodeId]', params: { id: episode.show!.id, episodeId: episode.id } }"
                     :value="episode.id"
                     class="pa-0 ma-0"
                     color="primary">
            <template v-slot:prepend>
                <Image :imageId="ImageUtilService.getBackgroundImageId(episode.images!)" class="align-end"
                       height="100px" rounded="rounded" width="160px">
                    <v-progress-linear v-if="getProgressInPercent(episode.watchStatus, episode.mediaFile)"
                                       :model-value="getProgressInPercent(episode.watchStatus, episode.mediaFile)"
                                       color="primary"></v-progress-linear>
                </Image>
                <v-container></v-container>
            </template>
            <v-list-item-title>{{ episode.number }}
                {{ MetadataUtilService.getMetadataFieldForLanguage('title', episode.metadata, $t("iso-639-3")) }}
            </v-list-item-title>
            <v-list-item-subtitle>{{
                    getProgressInPercent(episode.watchStatus, episode.mediaFile)
                }}
            </v-list-item-subtitle>
        </v-list-item>
        <v-skeleton-loader v-for="i in 9" v-else :key="'list-item-skeleton-loader' + i" class="pa-0 ma-0"
                           height="100px"
                           type="list-item-avatar"></v-skeleton-loader>
    </v-list>
</template>

<script lang="ts" setup>

import type {Ref} from 'vue'
import {ref, watch} from 'vue'
import {useGoTo} from 'vuetify'
import ImageUtilService from '@/services/imageUtil.service';
import MetadataUtilService from "@/services/metadataUtil.service";
import {useQuery} from "@urql/vue";
import {graphql} from "@/generated-sources/gql";

const props = defineProps<{
    seasonId: string,
    selectedEpisodeId?: string
}>()

watch(props, () => {
    if (props.selectedEpisodeId) {
        selected.value = [props.selectedEpisodeId];
        scrollTo();
    } else {
        selected.value = [];
    }
})

const goTo = useGoTo()
const selected: Ref<Array<string>> = ref([]);

function getProgressInPercent(watchStatus: { progressInMilliseconds: number }[] | undefined | null, mediaFile: {
    durationInMilliseconds?: number | undefined | null
}[] | undefined | null): number | undefined {
    if (mediaFile && mediaFile.length !== 0 && watchStatus && watchStatus.length !== 0) {
        return watchStatus[0].progressInMilliseconds! / mediaFile[0].durationInMilliseconds! * 100;
    }
}

const id: string = props.seasonId;

const result = useQuery({
    requestPolicy: 'cache-and-network',
    variables: {id},
    query: graphql(`
        query seasonById($id: ID!) {
          seasonById(id: $id) {
            episodes {
              id
              number
              metadata {
                description
                id
                language
                sourceUri
                title
              }
              show {
                id
              }
              images {
                id
                language
                path
                sourceUri
                type
              }
              watchStatus {
                id
                playQueueItemId
                progressInMilliseconds
                watched
              }
              mediaFile {
                durationInMilliseconds
                id
                path
                size
              }
            }
          }
        }`
    ),
})
const fetching = result.fetching;
const error = result.error;
const data = result.data;

result.then(resultValue => {
    if (props.selectedEpisodeId) {
        setTimeout(scrollTo, 100);
    }
})

function scrollTo() {
    if (props.selectedEpisodeId) {
        goTo("#list-item-" + props.selectedEpisodeId, {container: "#list-" + props.seasonId})
    }
}
</script>
