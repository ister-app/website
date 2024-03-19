<template>
    <v-img :src="imgObj" :style="style" :height="height" :width="width" :class="class" :gradient="gradient" :cover="cover" :rounded="rounded" :position="position" @load="onload">
        <slot></slot>
    </v-img>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useApiService } from '@/plugins/api';
import { VImg } from 'vuetify/lib/components/index.mjs';

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
    const posts = await apiService?.getImageControllerApi();

    const imageArray = await posts?.download1({ id: imageId });

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
