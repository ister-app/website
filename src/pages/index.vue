<template>
  <v-container class="" style="max-width: 1720px;">
    <v-row class="mt-2">
      <v-col col="12">
        <strong class="ml-16">{{ $t("index.continue_watching") }}:</strong>
      </v-col>
    </v-row>
    <v-row class="mt-2">
      <recentcarousel></recentcarousel>
    </v-row>
    <v-row no-gutters class="mt-2">
      <v-col col="12">
        <strong class="ml-16">{{ $t("index.new_shows") }}:</strong>
        <TVShowsSlide></TVShowsSlide>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  //
</script>
