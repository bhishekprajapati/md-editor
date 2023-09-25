<script setup>
import HomeLayout from "./layouts/Home.vue";

import ButtonToggleTheme from "./components/ButtonToggleTheme.vue";
import TheHeader from "./components/TheHeader.vue";
import TheMarkdown from "./components/TheMarkdown.vue";
import ListMarkdownFiles from "./components/ListMarkdownFiles.vue";

import { useMarkdownStore } from "./stores/useMarkdownStore";

const store = useMarkdownStore();
store.populate();
</script>

<template>
  <HomeLayout>
    <template v-slot:nav>
      <ListMarkdownFiles />
      <ButtonToggleTheme />
    </template>

    <template v-slot:header>
      <TheHeader />
    </template>

    <template v-slot:main>
      <TheMarkdown v-if="store.filename" />
    </template>
  </HomeLayout>
</template>
