<template>
    <!-- Error -->
    <v-alert v-if="error" type="error">{{ error }}</v-alert>

    <!-- Loading-->
    <v-slide-group v-if="fetching">
        <v-slide-group-item v-for="i in 40" :key="i">
            <v-skeleton-loader class="ma-3" height="340" type="image, list-item-two-line"
                               width="200"></v-skeleton-loader>
        </v-slide-group-item>
    </v-slide-group>

    <!-- Data-->
    <v-slide-group v-else-if="data && data.moviesRecentAdded">
        <v-slide-group-item v-for="movies in data.moviesRecentAdded" :key="movies.id">
            <v-card :to="{ name: '/movies/[id]', params: { id: movies.id } }" class="ma-3" width="200">
                <Image :imageId="ImageUtilService.getCoverImageId(movies.images!)" height="300px"></Image>
                <v-card-title>{{
                        MetadataUtilService.getMetadataFieldForLanguage('title', movies.metadata, $t("iso-639-3"))
                    }}
                </v-card-title>
                <v-card-subtitle>
                    {{ movies.releaseYear }}
                </v-card-subtitle>
            </v-card>
        </v-slide-group-item>
    </v-slide-group>

    <!-- No result -->
    <div v-else>{{ $t("index.no_shows_found") }}</div>
</template>

<script lang="ts" setup>
import {useQuery} from '@urql/vue';
import {graphql} from '@/generated-sources/gql';
import ImageUtilService from "@/services/imageUtil.service";
import MetadataUtilService from "@/services/metadataUtil.service";

const {fetching, error, data} = useQuery({
    requestPolicy: 'cache-and-network',
    query: graphql(`
        query moviesRecentAdded {
          moviesRecentAdded {
            id
            name
            releaseYear
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
