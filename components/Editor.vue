<script setup lang="ts">
const props = withDefaults(defineProps<{ fileId: string }>(), {
  fileId: "",
});
const editor = useEditorStore();

onMounted(() => {
  if (!props.fileId) {
    editor.$createLocalFile();
  }
});
onUnmounted(() => editor.$reset());
</script>

<template>
  <div class="grid h-full grid-cols-[1fr_auto_1fr]">
    <div v-if="true" class="flex h-full w-full items-center justify-center">
      <UiSpinner size="md" />
    </div>
    <!-- <textarea v-else class="h-full w-full" v-model="store.file.content" /> -->
    <UDivider orientation="vertical" />
    <UiScrollArea>
      <section>
        <div v-if="true" class="flex h-full w-full items-center justify-center">
          <UiSpinner size="md" />
        </div>
        <!-- <MarkdownPreview v-else :code="store.file?.content ?? ''" /> -->
      </section>
    </UiScrollArea>
  </div>
</template>
