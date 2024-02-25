<template>
    <v-skeleton-loader v-if="!loaded" type="image" style="height: 50vh;"></v-skeleton-loader>
    <v-img v-else gradient="rgba(0,0,0,0), rgba(0,0,0,1)" cover style="height: 50vh;"
        :src="backgroundImageUrl" position="top">
        <div class="d-flex flex-column fill-height justify-end ml-5 text-white">
            <h1 class="text-h4 font-weight-thin mb-4">
                {{ showEntity?.name }}
            </h1>
        </div>
    </v-img>
    <v-container style="max-width: 1720px;">
        <v-row class="mt-2">
            <v-col md="5" lg="4" xl="3" cols="12">
                <TVShowsSeasonExpansion v-if="showEntity" :tvShowId="showEntity.id" :selectedEpisode="episodeEntity"></TVShowsSeasonExpansion>
            </v-col>
            <v-col md="7" lg="8" xl="9" cols="12">
                <EpisodePlayer v-if="episodeEntity" :episodeEntity="episodeEntity"></EpisodePlayer>
                <v-container v-else-if="showEntity?.metadataEntities?.length !== 0">{{ showEntity?.metadataEntities[0].description }}</v-container>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';

import { computed, ref, watch } from 'vue'
import type { Ref } from 'vue'
import { Configuration, EpisodeEntity, EpisodeControllerApi, ShowEntity, ShowControllerApi, ImageEntityTypeEnum } from "@/generated-sources/openapi";
import EpisodePlayer from '@/components/EpisodePlayer.vue';

const route = useRoute();
const id = route.params.id;

const configuration = new Configuration({
    basePath: 'http://localhost:8080',
});

const showEntity: Ref<ShowEntity | undefined> = ref()
const episodeEntity: Ref<EpisodeEntity | undefined> = ref()
const loaded: Ref<boolean> = ref(false);

watch(() => route.params, () => {
    refreshEpisode();
});

const backgroundImageUrl = computed(() => {
    let url = '';
    showEntity.value?.imageEntities?.forEach(imageEntities => {
        if (imageEntities.type === ImageEntityTypeEnum.Background) {
            url = 'http://localhost:8080/images/' + imageEntities.id + '/download'
        }
    });
    return url;
});

function refresh() {
    const postsApi = new ShowControllerApi(configuration);
    const posts: Promise<ShowEntity> = postsApi.getTVShow({ id: route.params.id.toString() });
    posts.then((response: ShowEntity) => {
        showEntity.value = response;
        loaded.value = true;
    })
}

function refreshEpisode() {
    const postsApi = new EpisodeControllerApi(configuration);
    const posts: Promise<EpisodeEntity> = postsApi.getEpisode({ id: route.params.episodeId.toString() });
    posts.then((response: EpisodeEntity) => {
        episodeEntity.value = response;
        loaded.value = true;
    })
}

refresh();
if (route.params.episodeId) {
    refreshEpisode();
}

</script>
