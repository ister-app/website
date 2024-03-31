<template>
    <v-slide-group>
        <v-slide-group-item v-for="showEntity in tvShows" v-if="loaded" :key="showEntity.id">
            <v-card :to="{ name: '/tvshows/[id]/', params: { id: showEntity.id } }" class="ma-3" width="200">
                <Image :imageId="ImageUtilService.getCoverImageId(showEntity.imageEntities!)" height="300px"></Image>
                <v-card-title v-text="showEntity.name"></v-card-title>
                <v-card-subtitle>
                    Episode title
                </v-card-subtitle>
            </v-card>
        </v-slide-group-item>
        <v-slide-group-item v-for="i in 40" v-else :key="i">
            <v-skeleton-loader class="ma-3" height="340" type="image, list-item-two-line"
                               width="200"></v-skeleton-loader>
        </v-slide-group-item>

    </v-slide-group>
</template>

<script lang="ts" setup>
import type {Ref} from 'vue'
import {ref} from 'vue'
import {PageShowEntity, ShowEntity} from "@/generated-sources/openapi";
import ImageUtilService from '@/services/imageUtil.service';
import {useApiService} from '@/plugins/api';

const tvShows: Ref<ShowEntity[]> = ref([])
const loaded: Ref<boolean> = ref(false);

const apiService = useApiService();

async function refresh() {
    const postsApi = await apiService?.getShowControllerApi();
    const posts: Promise<PageShowEntity> = postsApi!.getRecent();
    console.log(posts);
    posts.then((response: PageShowEntity) => {
        response.content?.forEach((showEntity: ShowEntity) => tvShows.value.push(showEntity));
        loaded.value = true;
    })
}

refresh();

</script>
