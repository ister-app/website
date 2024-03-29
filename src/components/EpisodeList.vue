<template>
    <v-list density="compact" class="overflow-auto" height="500px" v-model:selected="selected" :id="'list-' + seasonId">
        <v-list-item v-if="loaded" v-for="episodeEntity in episodes" :key="episodeEntity.id" :value="episodeEntity.id" :id="'list-item-' + episodeEntity.id" color="primary"
            class="pa-0 ma-0" :to="{ name: '/tvshows/[id]/episodes.[episodeId]', params: { id: episodeEntity.showEntity?.id, episodeId: episodeEntity.id } }">
            <template v-slot:prepend>
                <Image :imageId="ImageUtilService.getBackgroundImageId(episodeEntity.imagesEntities!)" rounded="rounded" class="align-end" width="160px" height="100px">
                    <v-progress-linear v-if="getProgressInPercent(episodeEntity)" color="primary" :model-value="getProgressInPercent(episodeEntity)"></v-progress-linear>
                </Image>
                <v-container></v-container>
            </template>
            <v-list-item-title>{{ episodeEntity.number }} {{ episodeEntity.metadataEntities?.length !== 0 ? episodeEntity.metadataEntities![0].title : '' }}</v-list-item-title>
            <v-list-item-subtitle>episodeEntity 9 * Mrt 2022 * 41m</v-list-item-subtitle>
        </v-list-item>
        <v-skeleton-loader v-else-if="!loaded" v-for="i in 9" type="list-item-avatar" height="100px" :key="'list-item-skeleton-loader' + i"
            class="pa-0 ma-0"></v-skeleton-loader>
    </v-list>
</template>

<script lang="ts" setup>

import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import {EpisodeEntity, WatchStatusEntity} from "@/generated-sources/openapi";
import { useGoTo } from 'vuetify'
import { useApiService } from '@/plugins/api';
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
    const posts: Promise<EpisodeEntity[]> = postsApi!.getEpisodes({ id: props.seasonId });
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
        goTo("#list-item-" + props.selectedEpisode.id, { container: "#list-" + props.seasonId })
    }
}

refresh();
</script>
