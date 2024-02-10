<script setup>
import { ZodError } from "zod";

const toast = useToast();
const route = useRoute();
const store = useFileStore();

const isOpen = ref(false);
const isIndexPath = computed(() => route.path === "/");
const isSavingFilename = ref(false);

async function syncFilename(name) {
  isSavingFilename.value = true;

  try {
    store.getIsNew()
      ? await store.setFilename(name)
      : await store.patchFile({ name });

    !store.getIsNew() &&
      toast.add({ title: "Filename saved!", color: "green" });
  } catch (err) {
    let message;
    if (err instanceof ZodError) {
      message = err.format()._errors[0];
    }
    toast.add({ title: message ?? err?.message, color: "red" });
  } finally {
    isSavingFilename.value = false;
  }
}
</script>

<template>
  <div class="flex h-full items-center p-4">
    <UButton
      v-if="!isIndexPath"
      variant="link"
      size="xl"
      @click="isOpen = true"
      class="mr-2">
      <UIcon name="i-heroicons-bars-3" class="h-6 w-6" />
    </UButton>
    <Logo class="mr-12" />

    <ClientOnly>
      <InputButton
        v-if="store.file"
        @change="syncFilename"
        class="mr-auto"
        :loading="isSavingFilename"
        :key="route.path"
        :value="store.file?.name ?? ''"
        :disabled="store.isSharedFile" />

      <div class="ml-auto flex items-center gap-x-4">
        <ButtonSaveFile v-if="store.file && !store.isSharedFile" />
        <ButtonShare
          v-if="store.file && !store.getIsNew() && !store.isSharedFile" />
        <ButtonThemeToggle />
        <UserAuthState class="hidden md:block" />
      </div>
    </ClientOnly>
    <USlideover v-model="isOpen" side="left" class="w-[15%]"> </USlideover>
  </div>
</template>
