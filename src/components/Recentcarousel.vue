<template>
    <!-- Error -->
    <v-alert v-if="error" type="error">{{ error }}</v-alert>

    <v-col class="d-none d-md-inline" cols="12" lg="8" md="7">
        <v-skeleton-loader :loading="fetching" height="450px" type="image">
            <v-window v-model="window" class="fillcontent" show-arrows v-if="data?.episodesRecentWatched">
                <v-window-item v-for="episodes in data?.episodesRecentWatched.slice(0, 3)" :key="episodes.id">
                    <v-card>
                        <Image :imageId="ImageUtilService.getBackgroundImageId(episodes.images!)"
                               class="align-end"
                               cover gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.8)" height="450px">
                            <v-card-text class="text-white">
                                <p class="text-h5">{{
                                        MetadataUtilService.getMetadataFieldForLanguage('title', episodes.show!.metadata, $t("iso-639-3"))
                                    }}</p>
                                s{{ episodes.season?.number }}e{{ episodes.number }} {{
                                    MetadataUtilService.getMetadataFieldForLanguage('title', episodes.metadata, $t("iso-639-3"))
                                }}
                            </v-card-text>
                        </Image>
                    </v-card>
                </v-window-item>
            </v-window>
        </v-skeleton-loader>
    </v-col>
    <v-col cols="12" lg="4" md="5">
        <v-item-group v-model="window" mandatory v-if="data?.episodesRecentWatched">
            <v-container>
                <v-row v-for="episodeEntity in data?.episodesRecentWatched.slice(0, 3)" :key="episodeEntity.id">
                    <v-col class="pa-0 ma-0">
                        <v-item v-slot="{ isSelected, toggle }">
                            <v-card :color="isSelected ? 'primary' : ''" :to="{ name: '/shows/[id]/episodes.[episodeId]', params: { id: episodeEntity.show?.id, episodeId: episodeEntity.id } }" height="150px"
                                    @mouseover="toggle">
                                <v-scroll-y-transition>
                                    <v-container class="pa-0 ma-0">
                                        <v-row class="flex-nowrap">
                                            <v-col class="flex-grow-1 flex-shrink-1 text-truncate">
                                                <v-card-title class="text-h5">{{
                                                        MetadataUtilService.getMetadataFieldForLanguage('title', episodeEntity.show?.metadata, $t("iso-639-3"))
                                                    }}</v-card-title>
                                                <v-card-subtitle>s{{
                                                        episodeEntity.season?.number
                                                    }}e{{ episodeEntity.number }} {{
                                                        MetadataUtilService.getMetadataFieldForLanguage('title', episodeEntity.metadata, $t("iso-639-3"))
                                                    }}
                                                </v-card-subtitle>
                                            </v-col>
                                            <v-col class="flex-grow-0 flex-shrink-0">
                                                <Image
                                                    :imageId="ImageUtilService.getCoverImageId(episodeEntity.show?.images!)"
                                                    height="100%" width="100px"></Image>
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

<script lang="ts" setup>
import {ref} from 'vue'
import ImageUtilService from '@/services/imageUtil.service';
import MetadataUtilService from "../services/metadataUtil.service";

const window = ref(0)

import {useQuery} from '@urql/vue';
import {graphql} from '@/generated-sources/gql';

const {fetching, error, data} = useQuery({
    requestPolicy: 'cache-and-network',
    query: graphql(`
        query episodesRecentWatched {
          episodesRecentWatched {
            id
            show {
              id
              metadata {
                language
                title
              }
              images {
                language
                id
                type
              }
            }
            season {
              number
            }
            number
            metadata {
              language
              title
              id
              description
            }
            images {
              language
              id
              type
            }
          }
        }`
    )
});
</script>

<style>
.fillcontent {
    width: 100%;
}
</style>
