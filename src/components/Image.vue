<template>
    <v-img :class="class" :cover="cover" :gradient="gradient" :height="height" :position="position" :rounded="rounded"
           :src="imgObj" :style="style" :width="width" @load="onload">
        <slot></slot>
    </v-img>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {useApiService} from '@/plugins/api';
import {VImg} from 'vuetify/lib/components/index.mjs';

const props = defineProps<{
    imageId: string,
    style?: string,
    height?: string,
    width?: string,
    class?: string,
    gradient?: string,
    cover?: boolean,
    rounded?: string,
    position?: string
}>()

const imgObj = ref();

const apiService = useApiService();

async function downloadImage(imageId: string) {
    const posts = await apiService?.getFileControllerApi();

    const imageArray = await posts?.download1({id: imageId});

    if (imageArray !== undefined) {
        imgObj.value = URL.createObjectURL(imageArray);
    }
}

function onload() {
    URL.revokeObjectURL(imgObj.value);
}

if (props.imageId !== undefined && props.imageId !== '') {
    downloadImage(props.imageId);
}
</script>
