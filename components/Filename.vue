<script setup>
import { z } from "zod";

const toast = useToast();
const store = useFileStore();

const filename = ref(store.file?.name ?? "");
const isEditing = ref(false);
const filenameValidator = z.string().trim().min(5).max(50);

watch(store, ({ file }) => (filename.value = file?.name ?? ""));

async function syncFilename() {
  isEditing.value = false;

  const name = filenameValidator.safeParse(filename.value);

  if (!name.success) {
    toast.add({
      title: name.error.format()._errors[0].replace("String", "Filename"),
      color: "red",
    });

    // revert
    filename.value = store.file.name;

    return;
  }

  if (filename.value === store.file.name) {
    return;
  }

  if (store.getIsNew()) {
    store.file.name = name.data;

    return;
  }

  store.onSaveFilename(name.data, (err) => {
    if (err) {
      toast.add({
        title: err.message,
        color: "red",
      });

      return;
    }

    toast.add({
      title: "Filename saved!",
      color: "green",
    });
  });
}
</script>

<template>
  <div v-if="store.file">
    <UInput
      v-if="isEditing"
      v-model="filename"
      @blur="syncFilename"
      @keyup.enter="syncFilename"
      autofocus />
    <UButton
      v-else
      variant="ghost"
      icon="i-heroicons-pencil-square"
      color="white"
      @click="isEditing = true"
      :class="{ 'animate-pulse': store.isSyncingFilename }">
      {{ `${store.file.name}.md` }}
    </UButton>
  </div>
</template>
