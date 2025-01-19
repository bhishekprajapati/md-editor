<script setup>
import ButtonFile from "./ButtonFile.vue";
import { useMarkdownStore } from "../stores/useMarkdownStore";

const store = useMarkdownStore();

function openFileHandler(e) {
  const filename = e.target.dataset.filename;
  store.openFile(filename);
}
</script>
<template>
  <ul ref="list" v-if="store.fileList" class="[&>li:not(:last-child)]:mb-4">
    <li v-for="file of store.fileList" :key="file.filename">
      <ButtonFile
        :timestamp="file.meta.createdAt"
        :filename="file.filename"
        :data-filename="file.filename"
        @click="openFileHandler" />
    </li>
  </ul>
</template>
