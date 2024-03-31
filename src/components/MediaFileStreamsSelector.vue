<template>
    <v-menu v-model="menu" :close-on-content-click="false" location="top end">
        <template v-slot:activator="{ props }">
            <v-btn density="compact" icon="mdi-cog" v-bind="props"></v-btn>
        </template>

        <v-card min-width="300">

            <v-list>
                <v-list-item>
                    <v-select v-model="selectedAudioStream" :item-props="selectProps" :items="audioStreams"
                              label="Audio"></v-select>
                </v-list-item>

                <v-list-item>
                    <v-select v-model="selectedSubtitleStream" :clearable="true" :item-props="selectProps"
                              :items="subtitlesStreams" label="Subtitle"></v-select>
                </v-list-item>
            </v-list>
        </v-card>
    </v-menu>
</template>

<script lang="ts" setup>

import type {Ref} from 'vue'
import {computed, ref} from 'vue'
import {MediaFileStreamEntity} from "@/generated-sources/openapi";

const menu = ref(false)

const props = defineProps<{
    mediaFileStreams: MediaFileStreamEntity[],
}>()

const selectedAudioStream: Ref<number | undefined> = defineModel('selectedAudioStream')
const selectedSubtitleStream: Ref<number | undefined> = defineModel('selectedSubtitleStream')

const audioStreams = computed(() => {
    return props.mediaFileStreams.filter((stream) => stream.codecType === "AUDIO");
});

const subtitlesStreams = computed(() => {
    return props.mediaFileStreams.filter((stream) => ["SUBTITLE", "EXTERNAL_SUBTITLE"].includes(stream.codecType));
});

function selectProps(item: MediaFileStreamEntity) {
    return {
        title: item.language,
        subtitle: item.title,
        value: item.id
    }
}


</script>
