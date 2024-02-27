<template>
    <v-list density="compact" class="overflow-auto" height="500px" v-model:selected="selected" :id="'list-' + seasonId">
        <v-list-item v-if="loaded" v-for="episodeEntity in episodes" :key="episodeEntity.id" :value="episodeEntity.id" :id="'list-item-' + episodeEntity.id" color="primary"
            class="pa-0 ma-0" :to="{ name: '/tvshows/[id].episodes.[[episodeId]]', params: { id: episodeEntity.showEntity?.id, episodeId: episodeEntity.id } }">
            <template v-slot:prepend>
                <v-img :src="episodeEntity.imagesEntities?.length !== 0 ? backendUrl + '/images/' + episodeEntity.imagesEntities![0].id + '/download' : ''" rounded="rounded"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.8)" width="160px" height="100px">
                </v-img>
                <v-container></v-container>
            </template>
            <v-list-item-title>{{ episodeEntity.number }} {{ episodeEntity.metadataEntities?.length !== 0 ? episodeEntity.metadataEntities![0].title : '' }}</v-list-item-title>
            <v-list-item-subtitle v-text="'episodeEntity 9 * Mrt 2022 * 41m'"></v-list-item-subtitle>
        </v-list-item>
        <v-skeleton-loader v-if="!loaded" v-for="i in 9" type="list-item-avatar" height="100px"
            class="pa-0 ma-0"></v-skeleton-loader>
    </v-list>
</template>

<script lang="ts" setup>

import { ref } from 'vue'
import type { Ref } from 'vue'
import { Configuration, EpisodeEntity, SeasonControllerApi } from "@/generated-sources/openapi";
import { useGoTo } from 'vuetify'

const props = defineProps<{
    seasonId: string,
    selectedEpisode?: EpisodeEntity
}>()


const configuration = new Configuration({
    basePath: import.meta.env.VITE_BACKEND_URL,
});

const backendUrl: string = import.meta.env.VITE_BACKEND_URL;

const goTo = useGoTo()
const list = ref()
const episodes: Ref<Array<EpisodeEntity>> = ref([])
const loaded: Ref<boolean> = ref(false);
const selected: Ref<Array<String>> = ref([]);


function refresh() {
    const postsApi = new SeasonControllerApi(configuration);
    const posts: Promise<EpisodeEntity[]> = postsApi.getEpisodes({ id: props.seasonId });
    console.log(posts);
    posts.then((response: EpisodeEntity[]) => {
        episodes.value = response;
        loaded.value = true;
        if (props.selectedEpisode) {
            selected.value = [props.selectedEpisode.id!];
            setTimeout(scrollTo, 100);
        }
    })
}

function scrollTo() {
    if (props.selectedEpisode) {
        goTo("#list-item-" + props.selectedEpisode.id, { container: "#list-" + props.seasonId })
    }
    // document.getElementById(props.selectedEpisode.id!)?.scrollIntoView();
}

refresh();
</script>
