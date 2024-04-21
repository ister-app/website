<template>
    <v-menu v-model="menu" :close-on-content-click="false" location="top end">
        <template v-slot:activator="{ props }">
            <v-btn density="compact" icon="mdi-cog" v-bind="props"></v-btn>
        </template>

        <v-card min-width="300">

            <v-list>
                <v-list-item>
                    <v-select v-model="selectedAudioStream" :item-props="selectProps" :items="audioStreams"
                              :label="$t('global.audio')"></v-select>
                </v-list-item>

                <v-list-item>
                    <v-select v-model="selectedSubtitleStream" :clearable="true" :item-props="selectProps"
                              :items="subtitlesStreams" :label="$t('global.subtitle')"></v-select>
                </v-list-item>
            </v-list>
        </v-card>
    </v-menu>
</template>

<script lang="ts" setup>

import type {Ref} from 'vue'
import {computed, ref} from 'vue'
import {useAppStore} from "@/store/app";
import {MediaFileStream} from "@/generated-sources/gql/graphql";

const menu = ref(false)

const appStore = useAppStore();

const props = defineProps<{
    mediaFileStreams: MediaFileStream[],
}>()

const selectedAudioStream: Ref<number | undefined> = defineModel('selectedAudioStream')
const selectedSubtitleStream: Ref<number | undefined> = defineModel('selectedSubtitleStream')

const languageNames = new Intl.DisplayNames([appStore.language], {type: "language"});

const audioStreams = computed(() => {
    return props.mediaFileStreams.filter((stream) => stream.codecType === "AUDIO");
});

const subtitlesStreams = computed(() => {
    return props.mediaFileStreams.filter((stream) => {
        if (stream.codecType) {
            return ["SUBTITLE", "EXTERNAL_SUBTITLE"].includes(stream.codecType);
        } else {
            return false;
        }
    });
});

function selectProps(item: MediaFileStream) {
    return {
        title: getLanguageName(item.language!),
        subtitle: item.title,
        value: item.id
    }
}

function getLanguageName(languageCode: string | undefined) {
    return languageCode ? languageNames.of(languageCode) : "unknown";
}


</script>
