<script setup>
import markdownIt from "markdown-it";
const store = useFileStore();

const props = defineProps({
  id: {
    type: String,
  },
});

onMounted(async () => {
  if (!props.id) {
    return store.onNew();
  }

  await store.onOpen(props.id);
});

const md = markdownIt("commonmark", {
  html: true,
  xhtmlOut: true,
  linkify: true,
  typographer: true,
});
</script>

<template>
  <div class="grid h-full grid-cols-[1fr_auto_1fr]">
    <div>
      <div
        v-if="store.isLoading"
        class="flex h-full w-full items-center justify-center">
        <Spinner />
      </div>
      <textarea v-else class="h-full w-full" v-model="store.file.content" />
    </div>
    <UDivider orientation="vertical" />
    <div>
      <section class="scrollbar-none dark:bg-black-900 h-full overflow-y-auto">
        <div
          v-if="store.isLoading"
          class="flex h-full w-full items-center justify-center">
          <Spinner />
        </div>
        <div
          v-else
          class="markdown-preview px-5 py-4 md:px-6 md:py-[1.37rem]"
          v-html="md.render(store.file?.content ?? '')"></div>
      </section>
    </div>
  </div>
</template>
