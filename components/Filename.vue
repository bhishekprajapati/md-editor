<script setup>
import { z } from "zod";

const toast = useToast();
const store = useFileStore();
const filenameValidator = z.string().trim().min(5).max(50);

const isEditing = ref(false);

function onBlur(e) {
  const filename = filenameValidator.safeParse(e.target.value);

  if (!filename.success) {
    return toast.add({
      title: filename.error.format()._errors[0].replace("String", "Filename"),
      color: "red",
    });
  }
}
</script>

<template>
  <div v-if="store.file">
    <UInput
      v-if="isEditing"
      :model-value="store.file.name"
      @blur="onBlur"
      autofocus />
    <span v-else @click="isEditing = true"> {{ store.file.name }}.md </span>
  </div>
</template>
