<template>
    <v-list :id="'list-' + seasonId" v-model:selected="selected" class="overflow-auto" density="compact" height="500px">
        <v-list-item v-for="episodeEntity in episodes" v-if="loaded" :id="'list-item-' + episodeEntity.id" :key="episodeEntity.id"
                     :to="{ name: '/tvshows/[id]/episodes.[episodeId]', params: { id: episodeEntity.showEntity?.id, episodeId: episodeEntity.id } }" :value="episodeEntity.id"
                     class="pa-0 ma-0"
                     color="primary">
            <template v-slot:prepend>
                <Image :imageId="ImageUtilService.getBackgroundImageId(episodeEntity.imagesEntities!)" class="align-end"
                       height="100px" rounded="rounded" width="160px">
                    <v-progress-linear v-if="getProgressInPercent(episodeEntity)" :model-value="getProgressInPercent(episodeEntity)"
                                       color="primary"></v-progress-linear>
                </Image>
                <v-container></v-container>
            </template>
            <v-list-item-title>{{ episodeEntity.number }}
                {{ episodeEntity.metadataEntities?.length !== 0 ? episodeEntity.metadataEntities![0].title : '' }}
            </v-list-item-title>
            <v-list-item-subtitle>episodeEntity 9 * Mrt 2022 * 41m</v-list-item-subtitle>
        </v-list-item>
        <v-skeleton-loader v-for="i in 9" v-else-if="!loaded" :key="'list-item-skeleton-loader' + i" class="pa-0 ma-0"
                           height="100px"
                           type="list-item-avatar"></v-skeleton-loader>
    </v-list>
</template>

<script lang="ts" setup>

import type {Ref} from 'vue'
import {ref, watch} from 'vue'
import {EpisodeEntity} from "@/generated-sources/openapi";
import {useGoTo} from 'vuetify'
import {useApiService} from '@/plugins/api';
import ImageUtilService from '@/services/imageUtil.service';

const props = defineProps<{
    seasonId: string,
    selectedEpisode?: EpisodeEntity
}>()

watch(props, () => {
    console.log(props.selectedEpisode)
    if (props.selectedEpisode?.id) {
        selected.value = [props.selectedEpisode.id];
    } else {
        selected.value = [];
    }
})

const apiService = useApiService();

const goTo = useGoTo()
const episodes: Ref<Array<EpisodeEntity>> = ref([])
const loaded: Ref<boolean> = ref(false);
const selected: Ref<Array<String>> = ref([]);

function getProgressInPercent(episodeEntity: EpisodeEntity): number | undefined {
    if (episodeEntity && episodeEntity.mediaFileEntities && episodeEntity.mediaFileEntities.length !== 0 && episodeEntity.watchStatusEntities && episodeEntity.watchStatusEntities.length !== 0) {
        return episodeEntity.watchStatusEntities[0].progressInMilliseconds! / episodeEntity.mediaFileEntities[0].durationInMilliseconds! * 100;
    }
}


async function refresh() {
    const postsApi = await apiService?.getSeasonControllerApi();
    const posts: Promise<EpisodeEntity[]> = postsApi!.getEpisodes({id: props.seasonId});
    posts.then((response: EpisodeEntity[]) => {
        episodes.value = response;
        loaded.value = true;
        if (props.selectedEpisode && response.findIndex(item => item.id === props.selectedEpisode?.id)) {
            selected.value = [props.selectedEpisode.id!];
            setTimeout(scrollTo, 100);
        }
    })
}

function scrollTo() {
    if (props.selectedEpisode) {
        goTo("#list-item-" + props.selectedEpisode.id, {container: "#list-" + props.seasonId})
    }
}

refresh();
</script>
