<template>
    <!-- Error -->
    <v-alert v-if="error" type="error">{{ error }}</v-alert>

    <EpisodePlayer v-if="data?.episodeById" :episode="data?.episodeById"></EpisodePlayer>
</template>

<script lang="ts" setup>
import {computed, Ref, ref, watch} from 'vue'
import {useRoute} from 'vue-router/auto';
import {useQuery} from "@urql/vue";
import {graphql} from "@/generated-sources/gql";

defineProps<{
    show: String | undefined,
}>()

const emit = defineEmits<{
    (e: 'newEpisodeId', newEpisodeId: string | undefined): void
    (e: 'newSeasonId', newEpisodeId: string | undefined): void
}>()

const route = useRoute("/shows/[id]/episodes.[episodeId]");

// const id: Ref<string> = ref(route.params.episodeId);
const id = computed(() => route.params.episodeId);
const shouldPause = computed(() => route.params.episodeId == null);

const result = useQuery({
    requestPolicy: 'network-only',
    pause: shouldPause,
    variables: {id},
    query: graphql(`
        query episodeById($id: ID!) {
          episodeById(id: $id) {
            id
            number
            show {
              id
            }
            season {
              id
            }
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

watch(() => data.value, () => {
    console.log(data);
    if (data.value?.episodeById) {
        emit("newEpisodeId", data.value.episodeById?.id);
        emit("newSeasonId", data.value?.episodeById?.season!.id);
    }
});
</script>
