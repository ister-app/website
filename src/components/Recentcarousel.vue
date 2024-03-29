<template>
    <v-col md="7" lg="8" cols="12" class="d-none d-md-inline">
        <v-skeleton-loader :loading="!loaded" type="image" height="450px">
            <v-window v-model="window" show-arrows class="fillcontent">
                <v-window-item v-for="episodeEntity in episodes.slice(0, 3)" :key="episodeEntity.id">
                    <v-card>
                        <Image :imageId="ImageUtilService.getBackgroundImageId(episodeEntity.imagesEntities!)" class="align-end"
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.8)" height="450px" cover>
                            <v-card-text class="text-white">
                                <p class="text-h5">{{ episodeEntity.showEntity?.name }}</p>
                                s{{ episodeEntity.seasonEntity?.number }}e{{ episodeEntity.number }} {{ episodeEntity.metadataEntities?.length !== 0 ? episodeEntity.metadataEntities![0].title : '' }}
                            </v-card-text>
                        </Image>
                    </v-card>
                </v-window-item>
            </v-window>
        </v-skeleton-loader>
    </v-col>
    <v-col md="5" lg="4" cols="12">
        <v-item-group mandatory v-model="window">
            <v-container>
                <v-row v-for="episodeEntity in episodes.slice(0, 3)" :key="episodeEntity.id">
                    <v-col class="pa-0 ma-0">
                        <v-item v-slot="{ isSelected, toggle }">
                            <v-card :color="isSelected ? 'primary' : ''" @mouseover="toggle" height="150px"
                                :to="{ name: '/tvshows/[id]/episodes.[episodeId]', params: { id: episodeEntity.showEntity?.id, episodeId: episodeEntity.id } }">
                                <v-scroll-y-transition>
                                    <v-container class="pa-0 ma-0">
                                        <v-row class="flex-nowrap">
                                            <v-col class="flex-grow-1 flex-shrink-1 text-truncate">
                                                <v-card-title class="text-h5" v-text="episodeEntity.showEntity?.name"></v-card-title>
                                                <v-card-subtitle>s{{ episodeEntity.seasonEntity?.number }}e{{ episodeEntity.number }} {{ episodeEntity.metadataEntities?.length !== 0 ? episodeEntity.metadataEntities![0].title : '' }}</v-card-subtitle>
                                            </v-col>
                                            <v-col class="flex-grow-0 flex-shrink-0">
                                                <Image :imageId="ImageUtilService.getCoverImageId(episodeEntity.showEntity?.imageEntities!)" width="100px" height="100%"></Image>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-scroll-y-transition>
                            </v-card>
                        </v-item>
                    </v-col>
                </v-row>
            </v-container>
        </v-item-group>
    </v-col>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { EpisodeEntity } from "@/generated-sources/openapi";
import ImageUtilService from '@/services/imageUtil.service';
import { useApiService } from '@/plugins/api';

const episodes: Ref<EpisodeEntity[]> = ref([])
const loaded: Ref<boolean> = ref(false);

const window = ref(0)

const apiService = useApiService();

async function refresh() {
    const postsApi = await apiService?.getEpisodeControllerApi();
    const posts: Promise<Array<EpisodeEntity>> = postsApi!.getRecent2();
    console.log(posts);
    posts.then((response: Array<EpisodeEntity>) => {
        response?.forEach((episodeEntity: EpisodeEntity) => episodes.value.push(episodeEntity));
        loaded.value = true;
    })
}

refresh();
</script>

<style>
.fillcontent {
    width: 100%;
}
</style>
