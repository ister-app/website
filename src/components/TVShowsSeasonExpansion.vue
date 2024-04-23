<template>
    <!-- Error -->
    <v-alert v-if="error" type="error">{{ error }}</v-alert>

    <v-skeleton-loader v-if="fetching" height="50px" type="ossein"></v-skeleton-loader>
    <v-expansion-panels v-else v-model="selected">
        <v-expansion-panel v-for="season in data?.showById?.seasons" :key="season.id" :value="season.id">
            <v-expansion-panel-title>
                {{ $t("global.season") }} {{ season.number }}
            </v-expansion-panel-title>
            <v-expansion-panel-text>
                <EpisodeList :seasonId="season.id" :selectedEpisodeId="props.selectedEpisodeId"></EpisodeList>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script lang="ts" setup>

import {Ref, ref, watch} from 'vue'
import {useQuery} from "@urql/vue";
import {graphql} from "@/generated-sources/gql";
import {ShowByIdSeasonsQuery} from "@/generated-sources/gql/graphql";

const props = defineProps<{
    tvShowId: string,
    selectedEpisodeId?: string
    selectedSeasonId?: string
}>()

const selected: Ref<string | undefined> = ref();

const fetching: Ref<boolean | undefined> = ref(true);
const error: Ref<any | undefined> = ref();
const data: Ref<ShowByIdSeasonsQuery | undefined> = ref();

const id = props.tvShowId;

watch(props, () => {
    if (props.selectedSeasonId) {
        selected.value = props.selectedSeasonId;
    } else {
        selected.value = undefined;
    }
})

useQuery({
    variables: {id},
    query: graphql(`
        query showByIdSeasons($id: ID!) {
          showById(id: $id) {
            seasons {
              id
              number
            }
          }
        }`
    )
}).then(result => {
    fetching.value = result.fetching.value;
    error.value = result.error.value;
    data.value = result.data.value;
    if (props.selectedSeasonId) {
        selected.value = props.selectedSeasonId;
    }
})
</script>
