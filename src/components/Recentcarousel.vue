<template>
    <v-col md="7" lg="8" cols="12" class="d-none d-md-inline">
        <v-skeleton-loader :loading="!loaded" type="image" height="450px">
            <v-window v-model="window" show-arrows class="fillcontent">
                <v-window-item v-for="episodeEntity in episodes" :key="episodeEntity">
                    <v-card>
                        <v-img :src="episodeEntity.imagesEntities?.length !== 0 ? 'http://localhost:8080/images/' + episodeEntity.imagesEntities[0].id + '/download' : ''" class="align-end"
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.8)" height="450px">
                            <v-card-text class="text-white">
                                <p class="text-h5">{{ episodeEntity.showEntity?.name }}</p>
                                s{{ episodeEntity.seasonEntity?.number }}e{{ episodeEntity.number }} {{ episodeEntity.metadataEntities?.length !== 0 ? episodeEntity.metadataEntities[0].title : '' }}
                            </v-card-text>
                        </v-img>
                    </v-card>
                </v-window-item>
            </v-window>
        </v-skeleton-loader>
    </v-col>
    <v-col md="5" lg="4" cols="12">
        <v-item-group mandatory v-model="window">
            <v-container>
                <v-row v-for="episodeEntity in episodes" :key="episodeEntity">
                    <v-col class="pa-0 ma-0">
                        <v-item v-slot="{ isSelected, toggle }">
                            <v-card :color="isSelected ? 'primary' : ''" @mouseover="toggle" height="150px"
                                :to="{ name: '/tvshows/[id].episodes.[[episodeId]]', params: { id: episodeEntity.showEntity?.id, episodeId: episodeEntity.id } }">
                                <v-scroll-y-transition>
                                    <v-container class="pa-0 ma-0">
                                        <v-row class="flex-nowrap">
                                            <v-col class="flex-grow-1 flex-shrink-1 text-truncate">
                                                <v-card-title class="text-h5" v-text="episodeEntity.showEntity?.name"></v-card-title>
                                                <v-card-subtitle>s{{ episodeEntity.seasonEntity?.number }}e{{ episodeEntity.number }} {{ episodeEntity.metadataEntities?.length !== 0 ? episodeEntity.metadataEntities[0].title : '' }}</v-card-subtitle>
                                            </v-col>
                                            <v-col class="flex-grow-0 flex-shrink-0">
                                                <v-img width="100px" height="100%"
                                                    :src="episodeEntity.showEntity?.imageEntities?.length !== 0 ? 'http://localhost:8080/images/' + episodeEntity.showEntity?.imageEntities[0].id + '/download' : ''"></v-img>
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
import { Configuration, PageEpisodeEntity, EpisodeEntity, EpisodeControllerApi } from "@/generated-sources/openapi";

const configuration = new Configuration({
    basePath: 'http://localhost:8080',
});

const episodes: Ref<EpisodeEntity[]> = ref([])
const loaded: Ref<boolean> = ref(false);

const length = ref(3)
const window = ref(0)

function refresh() {
    const postsApi = new EpisodeControllerApi(configuration);
    const posts: Promise<PageEpisodeEntity> = postsApi.getRecent2();
    console.log(posts);
    posts.then((response: PageEpisodeEntity) => {
        response.content?.forEach((episodeEntity: EpisodeEntity) => episodes.value.push(episodeEntity));
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
