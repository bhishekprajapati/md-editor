<script setup>
import IconFile from "./Icons/IconFile.vue";
import { useMarkdownStore } from "../stores/useMarkdownStore";

const store = useMarkdownStore();
</script>

<template>
  <IconFile class="mr-4 inline-block" />

  <span class="display-m inline-block text-white">
    <input
      ref="input"
      type="text"
      autocomplete="off"
      autocorrect="off"
      spellcheck="off"
      class="w-24 rounded !border-none bg-transparent p-1 capitalize caret-white transition-all after:content-[.md] read-only:!outline-none focus:outline focus:outline-2 focus:outline-orange-800"
      v-model.trim.lazy="store.filename" />
    <!-- input has to be lazy only -->
  </span>
</template>
