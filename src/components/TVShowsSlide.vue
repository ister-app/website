<template>
    <v-slide-group>
        <v-slide-group-item v-if="loaded" v-for="showEntity in tvShows" :key="showEntity.id">
            <v-card class="ma-3" width="200" :to="{ name: '/tvshows/[id].episodes.[[episodeId]]', params: { id: showEntity.id } }">
                <v-img
                :src="showEntity.imageEntities?.length !== 0 ? backendUrl + '/images/' + showEntity.imageEntities![0].id + '/download' : ''"
                    height="300px" cover></v-img>
                <v-card-title v-text="showEntity.name"></v-card-title>
                <v-card-subtitle>
                    Episode title
                </v-card-subtitle>
            </v-card>
        </v-slide-group-item>
        <v-slide-group-item v-else v-for="i in 40" :key="i">
            <v-skeleton-loader height="340" width="200" type="image, list-item-two-line" class="ma-3"></v-skeleton-loader>
        </v-slide-group-item>

    </v-slide-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { Configuration, PageShowEntity, ShowEntity, ShowControllerApi } from "@/generated-sources/openapi";

const configuration = new Configuration({
    basePath: import.meta.env.VITE_BACKEND_URL,
});

const backendUrl: string = import.meta.env.VITE_BACKEND_URL;

const tvShows: Ref<ShowEntity[]> = ref([])
const loaded: Ref<boolean> = ref(false);

const length = ref(3)
const window = ref(0)

function refresh() {
    const postsApi = new ShowControllerApi(configuration);
    const posts: Promise<PageShowEntity> = postsApi.getRecent();
    console.log(posts);
    posts.then((response: PageShowEntity) => {
        response.content?.forEach((showEntity: ShowEntity) => tvShows.value.push(showEntity));
        loaded.value = true;
    })
}

refresh();

</script>
