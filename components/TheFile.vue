<script setup>
import markdownIt from "markdown-it";
import sampleMd from "~/sample-md";

const props = defineProps({
  id: {
    type: String,
  },
});

const isNew = ref(!props.id); // open as new document if no id provided
const isLoading = ref(true);
const code = ref(isNew ? sampleMd : "");

onMounted(async () => {
  if (isNew.value) {
    return (isLoading.value = false);
  }

  if (!isNew.value) {
    try {
      const fileContent = await $fetch("/api/file", {
        query: {
          id: props.id,
        },
      });
      code.value = fileContent.content;
    } catch (err) {
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  }
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
      <ClientOnly>
        <div
          v-if="isLoading"
          class="flex h-full w-full items-center justify-center">
          <Spinner />
        </div>
        <textarea v-else class="h-full w-full" v-model="code" />
      </ClientOnly>
    </div>
    <UDivider orientation="vertical" />
    <div>
      <section class="scrollbar-none dark:bg-black-900 h-full overflow-y-auto">
        <ClientOnly>
          <div
            v-if="isLoading"
            class="flex h-full w-full items-center justify-center">
            <Spinner />
          </div>
          <div
            v-else
            class="markdown-preview px-5 py-4 md:px-6 md:py-[1.37rem]"
            v-html="md.render(code)"></div>
        </ClientOnly>
      </section>
    </div>
  </div>
</template>
