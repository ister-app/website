<template>
    <!-- Error -->
    <v-alert v-if="error" type="error">{{ error }}</v-alert>

    <MoviePlayer v-if="data?.movieById" :movie="data?.movieById"></MoviePlayer>
</template>

<script lang="ts" setup>
import {computed} from 'vue'
import {useRoute} from 'vue-router/auto';
import {useQuery} from "@urql/vue";
import {graphql} from "@/generated-sources/gql";

const route = useRoute("/movies/[id]");

const id = computed(() => route.params.id);
const shouldPause = computed(() => route.params.id == null);

const result = useQuery({
    requestPolicy: 'network-only',
    pause: shouldPause,
    variables: {id},
    query: graphql(`
        query movieById($id: ID!) {
          movieById(id: $id) {
            id
            metadata {
              description
              id
              language
              sourceUri
              title
            }
            watchStatus {
              id
              playQueueItemId
              progressInMilliseconds
              watched
            }
            mediaFile {
              durationInMilliseconds
              id
              path
              size
              mediaFileStreams {
                codecName
                codecType
                height
                id
                language
                path
                streamIndex
                title
                width
              }
            }
          }
        }`
    ),
});

const fetching = result.fetching;
const error = result.error;
const data = result.data;
</script>
