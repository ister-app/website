<template>
    <!-- Error -->
    <v-alert v-if="error" type="error">{{ error }}</v-alert>

    <v-skeleton-loader v-if="fetching" style="height: 50vh;" type="image"></v-skeleton-loader>
    <Image v-else-if="data?.showById?.images" :imageId="ImageUtilService.getBackgroundImageId(data?.showById?.images)" :style="'height: 50vh;'"
           cover
           gradient="rgba(0,0,0,0), rgba(0,0,0,1)" position="top">
        <div class="d-flex flex-row align-end fill-height">
            <v-btn :to="{ name: '/shows/[id]/', params: { id: route.params.id } }"
                   class="text-h4 font-weight-thin mb-4 text-white"
                   variant="plain">
                {{ data?.showById?.name }}
            </v-btn>
        </div>
    </Image>
    <v-container style="max-width: 1720px;">
        <v-row class="mt-2">
            <v-col cols="12" lg="8" md="7" xl="9">
                <router-view v-slot="{ Component, route }">
                    <component :is="Component" :show="data?.showById"
                               @newEpisodeId="(newSelectedEpisodeId : string | undefined) => selectedEpisodeId=newSelectedEpisodeId"
                               @newSeasonId="(newSelectedSeasonId : string | undefined) => selectedSeasonId=newSelectedSeasonId"/>
                </router-view>
            </v-col>
            <v-col cols="12" lg="4" md="5" xl="3">
                <TVShowsSeasonExpansion v-if="data?.showById" :selectedEpisodeId="selectedEpisodeId" :selectedSeasonId="selectedSeasonId" :tvShowId="data.showById.id">
                </TVShowsSeasonExpansion>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>

import {Ref, ref} from 'vue'
import {useRoute} from 'vue-router/auto';
import ImageUtilService from '@/services/imageUtil.service';
import {useQuery} from "@urql/vue";
import {graphql} from "@/generated-sources/gql";

const route = useRoute("/shows/[id]/");

const selectedEpisodeId: Ref<string | undefined> = ref();
const selectedSeasonId: Ref<string | undefined> = ref();

const id = route.params.id;

const {fetching, error, data} = useQuery({
    variables: { id },
    query: graphql(`
        query showById($id: ID!) {
          showById(id: $id) {
            id
            images {
              language
              id
              sourceUri
              type
              path
            }
            name
            releaseYear
            metadata {
              description
              id
              language
              sourceUri
              title
            }
          }
        }`
    )
});


</script>
