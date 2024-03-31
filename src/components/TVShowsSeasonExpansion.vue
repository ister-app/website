<template>
    <v-skeleton-loader v-if="!loaded" height="50px" type="ossein"></v-skeleton-loader>
    <v-expansion-panels v-else v-model="selected">
        <v-expansion-panel v-for="seasonEntity in seasons" :key="seasonEntity.id" :value="seasonEntity.id">
            <v-expansion-panel-title>
                {{ $t("global.season") }} {{ seasonEntity.number }}
            </v-expansion-panel-title>
            <v-expansion-panel-text>
                <EpisodeList :seasonId="seasonEntity.id" :selectedEpisode="props.selectedEpisode"></EpisodeList>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script lang="ts" setup>

import type {Ref} from 'vue'
import {ref} from 'vue'
import {EpisodeEntity, SeasonEntity} from "@/generated-sources/openapi";
import {useApiService} from '@/plugins/api';

const props = defineProps<{
    tvShowId: string,
    selectedEpisode?: EpisodeEntity
}>()

const seasons: Ref<Array<SeasonEntity>> = ref([])
const loaded: Ref<boolean> = ref(false);
const selected: Ref<String | undefined> = ref();

const apiService = useApiService();

async function refresh() {
    const postsApi = await apiService?.getShowControllerApi();
    const posts: Promise<SeasonEntity[]> = postsApi!.getSeasons({id: props.tvShowId});
    console.log(posts);
    posts.then((response: SeasonEntity[]) => {
        seasons.value = response;
        loaded.value = true;
        if (props.selectedEpisode) {
            selected.value = props.selectedEpisode.seasonEntity?.id;
        }
    })
}

refresh();
</script>
