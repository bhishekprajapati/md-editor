<script setup>
const router = useRouter();
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
  <div v-if="!store.error" class="grid h-full grid-cols-[1fr_auto_1fr]">
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
  <div v-else>
    <div v-if="store.error.statusCode === 403" class="text-center">
      <UCard class="mt-32 inline-block w-fit p-16">
        <h1 class="mb-8 text-3xl text-red-500">
          You're unauthorized to access this file!
        </h1>

        <UButton
          icon="i-heroicons-document-duplicate"
          color="blue"
          size="xl"
          class="rounded-full"
          @click="() => router.push('/files')">
          My Files
        </UButton>
      </UCard>
    </div>
  </div>
</template>
