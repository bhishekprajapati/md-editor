<script setup lang="ts">
import type { FileRead } from "~/types/client";
import moment from "moment";

const props = defineProps<{
  file: FileRead;
}>();
</script>

<template>
  <ULink class="text-left" :to="`/editor/${props.file.id}`">
    <UCard>
      <article>
        <h2 class="mb-4">
          <UIcon name="i-heroicons-document" class="mr-4 align-middle" />
          {{ props.file.name }}.md
        </h2>
        <ul>
          <li class="mb-2">
            <UiAutoRefresh>
              <UIcon
                name="i-heroicons-calendar-days"
                class="mr-4 align-middle" />Created at
              {{ moment(props.file.createdAt).format("DD MMMM YYYY") }}
            </UiAutoRefresh>
          </li>
          <li class="mb-2">
            <UIcon name="i-heroicons-arrow-path" class="mr-4 align-middle" />
            <UiAutoRefresh>
              <UBadge color="white" variant="solid">
                {{ moment(props.file.updatedAt).fromNow() }}
              </UBadge>
            </UiAutoRefresh>
          </li>
        </ul>
      </article>
    </UCard>
  </ULink>
</template>
