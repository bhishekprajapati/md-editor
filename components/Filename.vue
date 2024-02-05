<script setup>
import { z } from "zod";

const toast = useToast();
const store = useFileStore();
const filename = ref(store.file?.name || "");
const filenameValidator = z.string().trim().min(5).max(50);

const isEditing = ref(false);
</script>

<template>
  <div v-if="store.file">
    <UInput v-if="isEditing" :model-value="filename" @blur="onBlur" autofocus />
    <span v-else @click="isEditing = true"> {{ store.file.name }}.md </span>
  </div>
</template>
