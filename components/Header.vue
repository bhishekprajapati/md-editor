<script setup>
const route = useRoute();
const isIndexPath = computed(() => route.path === "/");
const store = useFileStore();
const isOpen = ref(false);
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
      <Filename class="mr-auto" />

      <div class="ml-auto flex items-center gap-x-4">
        <ButtonSaveFile v-if="store.file" />
        <ButtonDeleteFile v-if="store.file" class="mr-8" />
        <ButtonThemeToggle />
        <UserAuthState class="hidden" />
      </div>
    </ClientOnly>
    <USlideover v-model="isOpen" side="left" class="w-[15%]"> </USlideover>
  </div>
</template>
