<script setup>
const store = useFileStore();
const route = useRoute();
const id = route.params?.id;

onMounted(() => {
  if (!id) {
    return store.onNew();
  }

  return store.onOpen(id);
});

onUnmounted(() => store.$reset());
</script>

<template>
  <div class="grid h-full grid-cols-[1fr_auto_1fr]">
    <div
      v-if="store.isLoading || !store.file"
      class="flex h-full w-full items-center justify-center">
      <Spinner />
    </div>
    <textarea v-else class="h-full w-full" v-model="store.file.content" />
    <UDivider orientation="vertical" />
    <ScrollArea>
      <section>
        <div
          v-if="store.isLoading || !store.file"
          class="flex h-full w-full items-center justify-center">
          <Spinner />
        </div>
        <MarkdownPreview v-else :code="store.file?.content ?? ''" />
      </section>
    </ScrollArea>
  </div>
</template>
