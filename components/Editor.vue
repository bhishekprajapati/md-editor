<script setup lang="ts">
import sampleMd from "~/sample-md";
import { TRPCClientError } from "@trpc/client";

interface Props {}

const props = defineProps<Props>();
</script>

<template>
  <!-- <div class="grid h-full grid-cols-[1fr_auto_1fr]">
    <div
      v-if="isFetching"
      class="flex h-full w-full items-center justify-center">
      <UiSpinner size="md" />
    </div>
    <div v-else>
      <textarea
        class="h-full w-full p-4 !outline-none"
        @change.once="editor.hasChanged = true"
        v-model="editor.file.content" />
    </div>
    <UDivider orientation="vertical" />
    <UiScrollArea>
      <section class="h-full">
        <div
          v-if="isFetching"
          class="flex h-full w-full items-center justify-center">
          <UiSpinner size="md" />
        </div>
        <div v-else>
          <MarkdownPreview :code="editor.file.content" />
        </div>
      </section>
    </UiScrollArea>
  </div>

  <Teleport to="#editor-actions">
    <div class="flex items-center gap-x-4">
      <UiInputButton :value="editor.file.name" @change="onChangeFilename" />

      <UBadge v-if="!isLocal" variant="solid" color="gray" class="ms-auto">
      </UBadge>

      <UButton
        class="ms-auto"
        variant="outline"
        :color="editor.hasChanged ? 'red' : 'gray'"
        icon="i-heroicons-cloud-arrow-up"
        @click="save"
        :disabled="!editor.hasChanged">
        Save
      </UButton>
    </div>
  </Teleport> -->
</template>
