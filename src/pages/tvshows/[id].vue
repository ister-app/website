<template>
    <v-skeleton-loader v-if="!loaded" style="height: 50vh;" type="image"></v-skeleton-loader>
    <Image v-else :imageId="ImageUtilService.getBackgroundImageId(showEntity!.imageEntities!)" :style="'height: 50vh;'"
           cover
           gradient="rgba(0,0,0,0), rgba(0,0,0,1)" position="top">
        <div class="d-flex flex-row align-end fill-height">
            <v-btn :to="{ name: '/tvshows/[id]/', params: { id: route.params.id } }"
                   class="text-h4 font-weight-thin mb-4 text-white"
                   variant="plain">
                {{ showEntity?.name }}
            </v-btn>
        </div>
    </Image>
    <v-container style="max-width: 1720px;">
        <v-row class="mt-2">
            <v-col cols="12" lg="8" md="7" xl="9">
                <router-view v-slot="{ Component }">
                    <component :is="Component" :showEntity="showEntity"
                               @newEpisodeEntity="(episodeEntity2 : EpisodeEntity) => episodeEntity=episodeEntity2"/>
                </router-view>
            </v-col>
            <v-col cols="12" lg="4" md="5" xl="3">
                <TVShowsSeasonExpansion v-if="showEntity" :selectedEpisode="episodeEntity" :tvShowId="showEntity.id">
                </TVShowsSeasonExpansion>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>

import {Ref, ref} from 'vue'
import {EpisodeEntity, ShowEntity} from "@/generated-sources/openapi";
import {useRoute} from 'vue-router/auto';
import {useApiService} from '@/plugins/api';
import ImageUtilService from '@/services/imageUtil.service';

const route = useRoute("/tvshows/[id]/");

const apiService = useApiService();

const showEntity: Ref<ShowEntity | undefined> = ref();
const episodeEntity: Ref<EpisodeEntity | undefined> = ref();
const loaded: Ref<boolean> = ref(false);

async function refresh() {
    const postsApi = await apiService?.getShowControllerApi();
    const posts: Promise<ShowEntity> = postsApi!.getTVShow({id: route.params.id.toString()});
    posts.then((response: ShowEntity) => {
        showEntity.value = response;
        loaded.value = true;
    })
}

refresh();


</script>
