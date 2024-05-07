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
    <v-slide-group v-else-if="data && data.showsRecentAdded">
        <v-slide-group-item v-for="show in data.showsRecentAdded" :key="show.id">
            <v-card :to="{ name: '/shows/[id]/', params: { id: show.id } }" class="ma-3" width="200">
                <Image :imageId="ImageUtilService.getCoverImageId(show.images!)" height="300px"></Image>
                <v-card-title>{{
                        MetadataUtilService.getMetadataFieldForLanguage('title', show.metadata, $t("iso-639-3"))
                    }}
                </v-card-title>
                <v-card-subtitle>
                    {{ show.releaseYear }}
                </v-card-subtitle>
            </v-card>
        </v-slide-group-item>
    </v-slide-group>

    <!-- No result -->
    <div v-else>{{ $t("index.no_shows_found") }}</div>
</template>

<script lang="ts" setup>
import ImageUtilService from '@/services/imageUtil.service';
import MetadataUtilService from "../services/metadataUtil.service";
import {useQuery} from '@urql/vue';
import {graphql} from '@/generated-sources/gql';

const {fetching, error, data} = useQuery({
    query: graphql(`
        query showsRecentAdded {
          showsRecentAdded {
            id
            releaseYear
            name
            images {
              type
              id
            }
                episodes {
              number
            }
            metadata {
              description
              title
              language
            }
          }
        }`
    )
});
</script>
